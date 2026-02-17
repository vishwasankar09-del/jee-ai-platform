from fastapi import FastAPI

app = FastAPI()

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

    return {
        "target_rank": rank,
        "difficulty": diff,
        "questions": 90
    }
