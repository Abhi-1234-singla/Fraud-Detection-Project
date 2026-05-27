from fastapi import APIRouter, HTTPException, Depends
from models.schemas import PredictionRequest, PredictionResponse
from utils.model_pipeline import predict_fraud
from database.mongodb import get_db
from datetime import datetime

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest, db = Depends(get_db)):
    try:
        # Run pipeline
        result = predict_fraud(request.dict(by_alias=True))
        
        # Prepare for DB
        doc = {
            "transaction_id": result["transaction_id"],
            "amount": request.amount,
            "oldbalanceOrig": getattr(request, "oldbalanceOrig", request.oldbalanceOrg),
            "newbalanceOrig": request.newbalanceOrig,
            "oldbalanceDest": request.oldbalanceDest,
            "newbalanceDest": request.newbalanceDest,
            "features": result["features_generated"],
            "prediction": result["prediction"],
            "fraud_probability": result["fraud_probability"],
            "risk_level": result["risk_level"],
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
            risk_level=result["risk_level"],
            reasons=result["reasons"],
            timestamp=result["timestamp"].isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
