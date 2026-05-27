import sys
sys.path.append('backend')
from utils.model_pipeline import predict_fraud

data = {
    "amount": 5000,
    "oldbalanceOrig": 12000,
    "newbalanceOrig": 7000,
    "oldbalanceDest": 1000,
    "newbalanceDest": 6000
}

try:
    print(predict_fraud(data))
except Exception as e:
    import traceback
    traceback.print_exc()
