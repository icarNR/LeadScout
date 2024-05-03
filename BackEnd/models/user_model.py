from pydantic import BaseModel
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
