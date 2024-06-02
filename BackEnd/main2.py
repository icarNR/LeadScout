

# The rest of your FastAPI application code goes here
from fastapi import FastAPI
from routes.authentication import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    
    


# # main.py
# from fastapi import FastAPI, HTTPException, Depends
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# from passlib.context import CryptContext

# app = FastAPI()

# # Enable CORS for frontend to communicate with the backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Adjust this according to your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Example user database
# fake_users_db = {
#     "user@example.com": {
#         "email": "user@example.com",
#         "hashed_password": "$2b$12$KIXTOvFH/nubK.Y8D5yue.CZoemxDCGBl6.wSmpk9wLkdT7oQ7WnS",  # "password"
#     }
# }

# # Context for hashing passwords
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# class User(BaseModel):
#     email: str
#     password: str

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# @app.post("/login")
# async def login(user: User):
#     user_in_db = fake_users_db.get(user.email)
#     if not user_in_db:
#         raise HTTPException(status_code=400, detail="Incorrect email or password")
#     if not verify_password(user.password, user_in_db["hashed_password"]):
#         raise HTTPException(status_code=400, detail="Incorrect email or password")
#     return {"msg": "Login successful"}
