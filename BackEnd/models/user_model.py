from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List
class Results(BaseModel):
    Openness: float
    Conscientiousness: float
    Extraversion: float
    Agreeableness: float
    Neuroticism: float

class User(BaseModel):
    user_id: str
    attempts: int
    supervisor: Optional[str]
    requested: bool
    answers: Optional[List[int]]
    results: Optional[Results]

class User(BaseModel):
    name: str
    email: EmailStr
    employee_id: str
    hashed_password: str
class UserInDB(User):
 id: int