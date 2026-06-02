from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PredictionRequest(BaseModel):
    transaction_type: str = Field(default="TRANSFER")
    amount: float
    oldbalanceOrg: float = Field(alias="oldbalanceOrig") # Support both just in case
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float

class PredictionResponse(BaseModel):
    transaction_id: str
    prediction: str
    fraud_probability: float
    confidence_score: float
    risk_level: str
    triggered_rules: List[str]
    reasons: List[str]
    timestamp: str

class TransactionDBModel(BaseModel):
    transaction_id: str
    user_id: str
    transaction_type: str
    amount: float
    oldbalanceOrig: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    features: dict
    prediction: str
    fraud_probability: float
    confidence_score: float
    risk_level: str
    triggered_rules: List[str]
    reasons: List[str]
    timestamp: datetime
