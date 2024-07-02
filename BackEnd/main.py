from fastapi import FastAPI
from routes.Employee_Criteria import router as employee_criteria_router
from crorSetting import setup_cors

app = FastAPI()

setup_cors(app)

# Include the router from Employee_Criteria.py
app.include_router(employee_criteria_router)


# The rest of your FastAPI application code goes here
