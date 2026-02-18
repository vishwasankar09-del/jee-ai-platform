from fastapi import FastAPI
from pydantic import BaseModel
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class TestRequest(BaseModel):
    subject: str
    chapter: str
    topic: str
    difficulty: str
    n: int

@app.get("/")
def home():
    return {"status": "🔥 JEE AI Engine Running Successfully"}

@app.post("/generate-test")
def generate_test(req: TestRequest):

    prompt = f"""
You are a senior JEE Advanced problem setter from IIT.

Generate a {req.difficulty} level JEE test with {req.n} questions from:

Subject: {req.subject}
Chapter: {req.chapter}
Topic: {req.topic}

Difficulty Rules:
- JEE Main: Moderate to hard
- JEE Advanced: Very hard, multi-concept, analytical

Output JSON STRICT:
{{
  "questions": [
    {{
      "id": 1,
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "B",
      "solution": "Step-by-step detailed explanation"
    }}
  ]
}}
"""

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.9
    )

    return response.choices[0].message.content

