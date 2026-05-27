from fastapi import APIRouter, HTTPException, Depends
from database.mongodb import get_db
from typing import List
import datetime

router = APIRouter()

@router.get("/transactions")
async def get_transactions(limit: int = 50, db = Depends(get_db)):
    try:
        cursor = db["transactions"].find().sort("timestamp", -1).limit(limit)
        transactions = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            if "timestamp" in doc and isinstance(doc["timestamp"], datetime.datetime):
                doc["timestamp"] = doc["timestamp"].isoformat()
            transactions.append(doc)
        return transactions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard-stats")
async def get_dashboard_stats(db = Depends(get_db)):
    try:
        total = await db["transactions"].count_documents({})
        fraud_count = await db["transactions"].count_documents({"prediction": "Fraudulent"})
        safe_count = await db["transactions"].count_documents({"prediction": "Safe"})
        
        # Risk distribution
        high_risk = await db["transactions"].count_documents({"risk_level": "High"})
        medium_risk = await db["transactions"].count_documents({"risk_level": "Medium"})
        low_risk = await db["transactions"].count_documents({"risk_level": "Low"})
        
        # We can simulate daily stats using recent transactions if there are not enough historical records
        # For a production dashboard, we'd use MongoDB aggregation framework
        
        return {
            "total_transactions": total,
            "fraudulent_transactions": fraud_count,
            "safe_transactions": safe_count,
            "risk_distribution": [
                {"name": "High Risk", "value": high_risk},
                {"name": "Medium Risk", "value": medium_risk},
                {"name": "Low Risk", "value": low_risk}
            ],
            "fraud_rate": round((fraud_count / total * 100) if total > 0 else 0, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
