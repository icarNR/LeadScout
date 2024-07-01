# criteria.py

from fastapi import APIRouter, HTTPException, Query
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client.test  # Replace 'test' with your actual database name

# Pydantic models
class Criteria(BaseModel):
    id: str
    name: str
    department: str

# Collections
users_collection = db.users  # Replace 'users' with your actual collection name

# Helper functions
def criteria_helper(criteria) -> Criteria:
    return Criteria(
        id=criteria["id"],
        name=criteria["name"],
        department=criteria["department"],
    )

# Criteria Router
router = APIRouter()

@router.get("/criteria", response_model=List[Criteria])
async def get_criteria():
    criteria_list = []
    for criteria in users_collection.find():
        criteria_list.append(criteria_helper(criteria))
    return criteria_list

@router.get("/criteria/{criteria_id}", response_model=Criteria)
async def get_criteria_by_id(criteria_id: str):
    criteria = users_collection.find_one({"id": criteria_id})
    if criteria:
        return criteria_helper(criteria)
    raise HTTPException(status_code=404, detail=f"Criteria with id {criteria_id} not found")

@router.get("/criteriafilter", response_model=List[Criteria])
async def get_criteria_filter(
    department: Optional[str] = Query(None, description="Filter criteria by department"),
    search_id: Optional[str] = Query(None, description="Search criteria by ID")
):
    query = {}
    if department:
        query["department"] = department
    if search_id:
        query["id"] = search_id

    criteria_list = []
    for criteria in users_collection.find(query):
        criteria_list.append(criteria_helper(criteria))
    return criteria_list
