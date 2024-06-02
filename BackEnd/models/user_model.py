from pydantic import BaseModel, BeforeValidator, EmailStr
from typing import Optional, Dict, List
from datetime import datetime
from typing_extensions import Annotated


PyObjectId = Annotated[str, BeforeValidator(str)]

class Results(BaseModel):
    user_id: str
    openness: float
    conscientiousness: float
    extraversion: float
    agreeableness: float
    neuroticism: float
    

class User(BaseModel):
    user_id: str
    name: str
    position: str
    attempts: Optional[int]
    supervisor: Optional[str]
    requested: bool
    self_answers: Optional[List[int]]
    supervisor_answers: Optional[List[int]]

class Supervisor(BaseModel):
    user_id: str
    attempts: int
    supervisor: Optional[str]
    requested: bool
    self_answers: Optional[List[int]]
    supervisor_answers: Optional[List[int]]

class Notification(BaseModel):
    user_id: str
    supervisor: Optional[str]
    date: datetime
    type: str 
    
# class LoginUser(BaseModel):
#     name: str
#     email: EmailStr
#     employee_id: str
#     hashed_password: str  
    
# class SignupRequest(BaseModel):
#     employee_id:str
#     email: str
#     password: str
    
      