from pydantic import BaseModel, EmailStr


class LoginUser(BaseModel):

    # name: str
    email: str
    employee_id: str
    hashed_password: str 
    
    class Config:
        json_schema_extra = {
            "example": {
                # "name": "Test Company",
                "email": "test@test.com",
                "hashed_password": "hashedpassword"
            }
        }
class SignupRequest(BaseModel):
    employee_id:str
    email: str
    password: str
            