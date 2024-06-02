# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel, EmailStr
# from motor.motor_asyncio import AsyncIOMotorClient
# from models.user_model import UserInDB
# from utils.security import hash_password, verify_password
# import os
# from dotenv import load_dotenv

# load_dotenv()

# router = APIRouter()

# # MongoDB connection settings
# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# DATABASE_NAME = os.getenv("DATABASE_NAME", "your_database_name")

# # Connect to MongoDB
# client = AsyncIOMotorClient(MONGO_URI)
# db = client[DATABASE_NAME]

# class UserCredentials(BaseModel):
#     email: EmailStr
#     password: str
    
# class UserData(BaseModel):
#     name: str
#     email: EmailStr
#     employee_id: str  # Add other fields if needed

# class PasswordData(BaseModel):
#     password: str
#     confirm_password: str

# @router.post("/register", response_description="Register a new user")
# async def register(user_data: UserData):
#     existing_user = await db.users.find_one({"email": user_data.email})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     user_in_db = user_data.dict()
#     await db.users.insert_one(user_in_db)
#     return {"message": "Registration step 1 successful"}

# @router.post("/register_step2", response_description="Complete registration step 2")
# async def register_step2(email: EmailStr, password_data: PasswordData):
#     if password_data.password != password_data.confirm_password:
#         raise HTTPException(status_code=400, detail="Passwords do not match")

#     hashed_password = hash_password(password_data.password)
#     update_result = await db.users.update_one({"email": email}, {"$set": {"hashed_password": hashed_password}})

#     if update_result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="User not found or password already set")

#     return {"message": "Registration step 2 completed"}

# @router.post("/login", response_description="Login a user")
# async def login(user_credentials: UserCredentials):
#     user = await db.users.find_one({"email": user_credentials.email})
#     if not user or not verify_password(user_credentials.password, user.get("hashed_password", "")):
#         raise HTTPException(status_code=401, detail="Invalid email or password")
    
#     return {"message": "Login successful"}


from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from database.db import DatabaseConnection
from models.company_model import  LoginUser,SignupRequest
 

from .security import create_access_token, get_current_user, create_refresh_token


from dotenv import load_dotenv

load_dotenv()

router = APIRouter()



@router.post("/refresh-token")
async def refresh_token(current_user: LoginUser = Depends(get_current_user)):
    access_token = create_access_token(
        data={"sub": current_user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db=DatabaseConnection("LoginUser")
    user = await db.authenticate_user(form_data.username,form_data.password)
    if not user :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


@router.post("/checkMail")
async def checkMail(email: EmailStr):
    user = await db.users.find_one({"email": email})
    if user:
        return {"exists": True}
    else:
        return {"exists": False}

@router.get("/me")
async def read_users_me(current_user: LoginUser = Depends(get_current_user)):
    return current_user