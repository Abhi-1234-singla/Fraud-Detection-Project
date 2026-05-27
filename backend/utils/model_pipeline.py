import os
import joblib
import pandas as pd
import numpy as np
from datetime import datetime
import uuid

# Load model
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "best_fraud_model_xgb.pkl")


try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Warning: Could not load model from {MODEL_PATH}. Exception: {e}")
    model = None

def generate_features(data: dict):
    # Base features
    amount = data["amount"]
    oldbalanceOrg = data.get("oldbalanceOrig", data.get("oldbalanceOrg", 0))
    newbalanceOrig = data["newbalanceOrig"]
    oldbalanceDest = data["oldbalanceDest"]
    newbalanceDest = data["newbalanceDest"]
    
    # Derived features
    balanceDiffOrig = oldbalanceOrg - newbalanceOrig
    balanceDiffDest = newbalanceDest - oldbalanceDest
    
    # Mocking hour and day for real-time since we don't have historical timestamp
    now = datetime.now()
    hour = now.hour
    day = now.day
    
    is_large_transaction = 1 if amount > 200000 else 0
    zeroBalanceOrig = 1 if newbalanceOrig == 0 else 0
    zeroBalanceDest = 1 if newbalanceDest == 0 else 0

    # Ensure column order matches the model expectation
    features = {
        "type": "TRANSFER",
        "amount": amount,
        "oldbalanceOrg": oldbalanceOrg,
        "newbalanceOrig": newbalanceOrig,
        "oldbalanceDest": oldbalanceDest,
        "newbalanceDest": newbalanceDest,
        "balanceDiffOrig": balanceDiffOrig,
        "balanceDiffDest": balanceDiffDest,
        "hour": hour,
        "day": day,
        "is_large_transaction": is_large_transaction,
        "zeroBalanceOrig": zeroBalanceOrig,
        "zeroBalanceDest": zeroBalanceDest
    }
    
    return features

def predict_fraud(data: dict):
    features = generate_features(data)
    
    if model:
        # Convert to DataFrame to match typical sklearn expectation
        df = pd.DataFrame([features])
        
        # Sometimes models are trained on specific feature order, this might need adjustment based on the actual model
        try:
            prediction = model.predict(df)[0]
            if hasattr(model, "predict_proba"):
                proba = model.predict_proba(df)[0]
                fraud_prob = proba[1] * 100 if len(proba) > 1 else (100.0 if prediction == 1 else 0.0)
            else:
                fraud_prob = 100.0 if prediction == 1 else 0.0
        except Exception as e:
            print(f"Prediction failed, falling back to heuristics: {e}")
            prediction, fraud_prob = fallback_heuristic(features)
    else:
        prediction, fraud_prob = fallback_heuristic(features)
        
    risk_level = "Low"
    if fraud_prob > 75:
        risk_level = "High"
    elif fraud_prob > 30:
        risk_level = "Medium"
        
    reasons = generate_reasons(features, fraud_prob)
    
    return {
        "transaction_id": f"TXN{uuid.uuid4().hex[:8].upper()}",
        "prediction": "Fraudulent" if prediction == 1 else "Safe",
        "fraud_probability": round(float(fraud_prob), 2),
        "risk_level": risk_level,
        "reasons": reasons,
        "features_generated": features,
        "timestamp": datetime.now()
    }

def fallback_heuristic(features):
    score = 0
    if features["is_large_transaction"] == 1:
        score += 40
    if features["zeroBalanceOrig"] == 1:
        score += 30
    if features["balanceDiffOrig"] == features["amount"]:
        score += 20
    if features["balanceDiffDest"] == 0 and features["amount"] > 0:
        score += 20
        
    fraud_prob = min(score, 99.0)
    prediction = 1 if fraud_prob > 50 else 0
    return prediction, fraud_prob

def generate_reasons(features, fraud_prob):
    reasons = []
    if fraud_prob < 30:
        reasons.append("Transaction patterns appear normal")
        return reasons
        
    if features["is_large_transaction"] == 1:
        reasons.append("Large transaction amount detected")
    if features["zeroBalanceOrig"] == 1:
        reasons.append("Sender balance depleted to zero")
    if features["amount"] > 0 and features["oldbalanceOrg"] < features["amount"]:
        reasons.append("Transaction amount exceeds sender original balance")
    if features["balanceDiffDest"] == 0 and features["amount"] > 0:
        reasons.append("Receiver balance did not increase appropriately")
        
    if not reasons and fraud_prob >= 30:
        reasons.append("Anomalous transaction patterns detected by AI model")
        
    return reasons
