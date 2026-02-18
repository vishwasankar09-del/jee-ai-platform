from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "JEE AI Backend Running Successfully"}

@app.get("/generate/{rank}")
def generate_test(rank: int):

    if rank <= 1000:
        diff = "Advanced"
    elif rank <= 5000:
        diff = "Hard"
    elif rank <= 15000:
        diff = "Medium"
    else:
        diff = "Easy"

    questions = []

    for i in range(10):
        x = random.randint(2,20)
        questions.append({
            "question": f"{diff} JEE Question: If x = {x}, find 3x",
            "options": [str(3*x), str(4*x), str(5*x), str(6*x)],
            "answer": str(3*x)
        })

    return {
        "difficulty": diff,
        "questions": questions
    }

