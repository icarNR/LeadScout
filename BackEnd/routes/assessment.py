from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database.db import DatabaseConnection
from crorSetting import setup_cors
app = FastAPI()
# Call the function to set up CORS
setup_cors(app)

class AssessmentAnswers(BaseModel):
    user_id: str
    answers: List[Optional[int]]  # Optional because some questions

def sum_of_indices(lst, indices):
    return sum(lst[i] for i in indices if i < len(lst))

@app.post("/submit_assessment/")
async def submit_assessment(assessment_answers: AssessmentAnswers):
    #Store the answers in the dictionary using the user_id as the key
    Extraversion=(sum_of_indices(assessment_answers.answers,[0,10,15,25,35])-sum_of_indices(assessment_answers.answers,[5,20,30])+15)/(25+15)
    Agreeableness=(sum_of_indices(assessment_answers.answers,[6,16,21,31,41])-sum_of_indices(assessment_answers.answers,[1,11,26,36])+20)/(25+20)
    Conscientiousness=(sum_of_indices(assessment_answers.answers,[2,12,27,32,37])-sum_of_indices(assessment_answers.answers,[7,17,22,42])+20)/(25+20)
    Neuroticism=(sum_of_indices(assessment_answers.answers,[3,13,18,28,38])-sum_of_indices(assessment_answers.answers,[8,23,33])+15)/()
    Openness=(sum_of_indices(assessment_answers.answers,[4,9,14,19,24,29,39,43])-sum_of_indices(assessment_answers.answers,[34,40])+10)/(30)
    
    # answers_db = {
    #     "answers": assessment_answers.answers,  # Store each answer with its index
    #     "results": {
    #         "Openness": Openness,
    #         "Conscientiousness": Conscientiousness,
    #         "Extraversion": Extraversion,
    #         "Agreeableness": Agreeableness,
    #         "Neuroticism": Neuroticism }
    # }
    db = DatabaseConnection("users")
  
    db.update_document(db.find_document_by_attribute("user_id",assessment_answers.user_id), "answers", assessment_answers.answers)
    # # Insert the User object into the MongoDB database
    # db.add_document(user.model_dump())
    return {"message": "Answers received", "user_id": assessment_answers.user_id}


@app.get("/get_answers")
async def get_answers(answers:List[int]):
      # Return the entire answers_db dictionary
  return answers



