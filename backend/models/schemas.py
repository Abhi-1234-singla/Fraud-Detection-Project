from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PredictionRequest(BaseModel):
    amount: float
    oldbalanceOrg: float = Field(alias="oldbalanceOrig") # Support both just in case
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float

class PredictionResponse(BaseModel):
    transaction_id: str
    prediction: str
    fraud_probability: float
    risk_level: str
    reasons: List[str]
    timestamp: str

class TransactionDBModel(BaseModel):
    transaction_id: str
    amount: float
    oldbalanceOrig: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    features: dict
    prediction: str
    fraud_probability: float
    risk_level: str
    reasons: List[str]
    timestamp: datetime
