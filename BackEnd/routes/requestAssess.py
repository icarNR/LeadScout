from fastapi import FastAPI,APIRouter
from pydantic import BaseModel, EmailStr
from datetime import datetime
from database.db import DatabaseConnection
from models.company_model import SignupRequest
from models.user_model import User, Results


router = APIRouter()
# Call the function to set up CORS


class User(BaseModel):
    id: str
    attempts: int = 0
    requested: bool = False

class Supervisor(BaseModel):
    id: str
    notifications: list = []
class LoginUser(BaseModel):
    name: str
    email: EmailStr
    employee_id: str
    hashed_password: str
    
login = {
            "example": {
                "name": "Test Company",
                "email": "test@test.com",
                "employee_id":"123K",
                "hashed_password": "hashedpassword@1"
            }
        }

users = {
    "001": {
    "attempts":0,
    "requested": False,
    "supervisor": "002"    },
    "002": {
    "attempts":1,
    "requested": False }
    }

supervisors = {
    "002": {
        "supervisees": ["001"],
        "notifications": {
            "1": {
                "user": "001",
                "user": "2",
                "date":'2',
                "time":'2',
                "assesment_req": False
            }
        }
    }
}


# Get the number of attempts and  requested flag for a user
@router.get("/api/users/{user_id}/attempts")
async def get_attempts(user_id: str):
    user = users.get(user_id)
    return {"attempts": user["attempts"], "requested": user["requested"]}

# Set the `requested` flag to `true` for a user & send notifications
@router.post("/api/users/{user_id}/request")
async def set_request(user_id: str):
    user = users.get(user_id)
    if user:
        user["requested"] = True
        supervisor = supervisors.get(users.get(user_id)["supervisor"])
    if supervisor:
        current_time = datetime.now()
        date_str = current_time.strftime("%Y:%m:%d")
        time_str = current_time.strftime("%H:%M:%S")
        unique_id = user_id + date_str + time_str
        new_notification = {
            "user": user_id,
            "date":date_str,
            "time":time_str,
            "assesment_req": True
        }
        supervisor["notifications"][unique_id] = new_notification
        return {"success": True}
    else:
        return {"success": False}


@router.get("/get_supervisors/")
async def get_supervisors():
    return supervisors

@router.get("/get_users/{userId}/")
async def get_users(userId: str):
    db = DatabaseConnection("Users")
    users = db.get_documents_by_attribute("supervisor", userId,["user_id","name"])
    print(users)
    return users

# @router.post("/company")
# async def get_company(company:Company):
#     db=DatabaseConnection("Company")
#     db.add_document(dict(company))
#     return "Success"


@router.post("/sign_up")
async def get_login(login_user:SignupRequest):
    db=DatabaseConnection("LoginUser")
    return await db.create_user(login_user.employee_id,login_user.email,login_user.password)
    # return "Success"
