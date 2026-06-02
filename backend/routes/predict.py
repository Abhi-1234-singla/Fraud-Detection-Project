from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.schemas import PredictionRequest, PredictionResponse, TransactionDBModel
from utils.model_pipeline import predict_fraud
from database.mongodb import get_db
from utils.auth_utils import get_current_user
from datetime import datetime

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest, db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    try:
        # Run pipeline
        data_dict = request.dict(by_alias=True)
        # Pass transaction_type to the pipeline
        data_dict["transaction_type"] = request.transaction_type
        
        result = predict_fraud(data_dict)
        
        # Prepare for DB
        doc = {
            "transaction_id": result["transaction_id"],
            "user_id": current_user["user_id"],
            "transaction_type": request.transaction_type,
            "amount": request.amount,
            "oldbalanceOrig": getattr(request, "oldbalanceOrig", request.oldbalanceOrg),
            "newbalanceOrig": request.newbalanceOrig,
            "oldbalanceDest": request.oldbalanceDest,
            "newbalanceDest": request.newbalanceDest,
            "features": result["features_generated"],
            "prediction": result["prediction"],
            "fraud_probability": result["fraud_probability"],
            "confidence_score": result["confidence_score"],
            "risk_level": result["risk_level"],
            "triggered_rules": result["triggered_rules"],
            "reasons": result["reasons"],
            "timestamp": result["timestamp"]
        }
        
        # Save to MongoDB
        await db["transactions"].insert_one(doc)
        
        # Return response
        return PredictionResponse(
            transaction_id=result["transaction_id"],
            prediction=result["prediction"],
            fraud_probability=result["fraud_probability"],
            confidence_score=result["confidence_score"],
            risk_level=result["risk_level"],
            triggered_rules=result["triggered_rules"],
            reasons=result["reasons"],
            timestamp=result["timestamp"].isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=List[TransactionDBModel])
async def get_history(db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    try:
        cursor = db["transactions"].find({"user_id": current_user["user_id"]}).sort("timestamp", -1)
        history = await cursor.to_list(length=100) # limit to 100 recent
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
