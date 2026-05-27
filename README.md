# AI-Powered Fraud Detection System

A full-stack fintech dashboard for real-time fraud detection using machine learning.

## Features

- **Real-time Prediction**: Process transactions and get instant fraud probability.
- **Machine Learning Integration**: Loads a trained scikit-learn model via joblib/pickle.
- **Dashboard Analytics**: Visualizes risk distribution and daily trends.
- **Modern Fintech UI**: Responsive design with TailwindCSS and Framer Motion.
- **Dark Mode**: Fully supported beautiful dark theme.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Recharts, Framer Motion
- **Backend**: FastAPI (Python), Uvicorn, Pydantic
- **Database**: MongoDB (Motor async driver)
- **ML**: Scikit-Learn, Pandas

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up Environment Variables:
   Edit `backend/.env` with your MongoDB Atlas URI:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster...
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run on `http://localhost:8000`.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Environment Variables

- **Backend**: `MONGO_URI` (MongoDB Connection String)
- **Frontend**: `VITE_API_URL` (Default is `http://localhost:8000/api`)
