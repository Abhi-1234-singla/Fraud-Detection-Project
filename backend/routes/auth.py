from fastapi import APIRouter, HTTPException, Depends, status
from models.auth import UserCreate, UserLogin, UserResponse, Token
from database.mongodb import get_db
from utils.auth_utils import get_password_hash, verify_password, create_access_token
from datetime import datetime, timedelta
import uuid

router = APIRouter()

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db = Depends(get_db)):
    # Check if user already exists
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user.password)
    
    new_user = {
        "_id": user_id,
        "name": user.name,
        "email": user.email,
        "password_hash": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    await db["users"].insert_one(new_user)
    
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user_id}
    )
    
    user_resp = UserResponse(
        id=user_id,
        name=user.name,
        email=user.email,
        created_at=new_user["created_at"]
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_resp}

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db = Depends(get_db)):
    user = await db["users"].find_one({"email": user_credentials.email})
    
    if not user or not verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user["email"], "user_id": str(user["_id"])}
    )
    
    user_resp = UserResponse(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        created_at=user["created_at"]
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_resp}
