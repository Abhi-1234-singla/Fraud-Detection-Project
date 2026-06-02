from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import predict, analytics, auth
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Fraud Detection API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to actual frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(predict.router, prefix="/api", tags=["Predict"])
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])


@app.get("/")
def read_root():
    return {"message": "Welcome to AI Fraud Detection API. Use /api/predict to score transactions."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
