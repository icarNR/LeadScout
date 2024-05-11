from fastapi import FastAPI,APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database.db import DatabaseConnection
from crorSetting import setup_cors
from models.user_model import User, Results
router = APIRouter()
# Call the function to set up CORS

class AssessmentAnswers(BaseModel):
    user_id: str
    answers: List[Optional[int]]  # Optional because some questions

def sum_of_indices(lst, indices):
    return sum(lst[i] for i in indices if i < len(lst))

def cal_extro(lst) : (sum_of_indices(lst,[0,10,15,25,35])-sum_of_indices(lst,[5,20,30])+15)/(40)
def cal_agree(lst) : (sum_of_indices(lst,[6,16,21,31,41])-sum_of_indices(lst,[1,11,26,36])+20)/(45)
def cal_consc(lst) : (sum_of_indices(lst,[2,12,27,32,37])-sum_of_indices(lst,[7,17,22,42])+20)/(45)
def cal_neuro(lst) : (sum_of_indices(lst,[3,13,18,28,38])-sum_of_indices(lst,[8,23,33])+15)/(40)
def cal_openn(lst) : (sum_of_indices(lst,[4,9,14,19,24,29,39,43])-sum_of_indices(lst,[34,40])+10)/(50)


@router.post("/submit_assessment/")
async def submit_assessment(assessment_answers: AssessmentAnswers):

    #make changes to user
    db = DatabaseConnection("User")
    docId=db.find_id_by_attribute("user_id",assessment_answers.user_id)
    document = db.get_document_by_id(docId)
    document.pop("_id", None)
    instance= User(**document)
    instance.self_answers=assessment_answers.answers
    db.replace_document_by_id(docId, instance.model_dump())
    print("record updated :"+docId)

    #check if supervisor has assessed
    if instance.supervisor_answers:
        print("all rady to calculate")
 
    #calculate traits
    Extraversion= cal_extro(instance.self_answers)*0.5+ cal_extro(instance.supervisor_answers)*0.5
    Agreeableness= cal_agree(instance.self_answers)*0.5+ cal_agree(instance.supervisor_answers)*0.5
    Conscientiousness= cal_consc(instance.self_answers)*0.5+ cal_consc(instance.supervisor_answers)*0.5
    Neuroticism= cal_neuro(instance.self_answers)*0.5+ cal_neuro(instance.supervisor_answers)*0.5
    Openness= cal_openn(instance.self_answers)*0.5+ cal_openn(instance.supervisor_answers)*0.5
    
    # save to results
    db = DatabaseConnection("Result")
    instance=Results(
            user_id= assessment_answers.user_id,
            extraversion=Extraversion,
            agreeableness=Agreeableness,
            conscientiousness=Conscientiousness,
            neuroticism=Neuroticism,
            openness=Openness
            )
    if document:
        instance= Results(**document)
        db.replace_document_by_id(docId, instance.model_dump())
        print("record updated :"+docId)
    else:
        db.add_document(instance.model_dump())
        print("new record added :"+docId)

    return {"message": "Answers received", "user_id": assessment_answers.user_id}


@router.get("/get_answers")
async def get_answers():
    # Return the entire answers_db dictionary
    db = DatabaseConnection("Result")
    docId=db.find_id_by_attribute("user_id",'001')
    document = db.get_document_by_id(docId)

    if document:
        document.pop("_id", None)
        instance= User(**document)
        instance.user_id='002'
        db.replace_document_by_id(docId, instance.model_dump())
        return instance
    else: 
        print("not found")

@router.get("/add_record")
async def create_document():
    db = DatabaseConnection("Users")
    results_instance=User(
        user_id= "002",
        attempts= 0,
        supervisor= None,
        requested= False,
        self_answers= None,
        supervisor_answers= None
        )
    print(results_instance)
    db.add_document(results_instance.model_dump())
