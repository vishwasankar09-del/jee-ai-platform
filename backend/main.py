from fastapi import FastAPI
from pydantic import BaseModel
import os
import json
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class TestRequest(BaseModel):
    subject: str
    chapter: str
    topic: str
    rank: int
    n: int

@app.get("/")
def home():
    return {"status": "🔥 JEE AI Engine Running Successfully"}

@app.post("/generate-test")
def generate_test(req: TestRequest):

    prompt = f"""
You are a senior JEE Advanced problem setter from IIT.

if req.rank <= 500:
    diff = "JEE Advanced – Extremely Hard"
elif req.rank <= 2000:
    diff = "JEE Advanced – Very Hard"
elif req.rank <= 5000:
    diff = "Hard"
elif req.rank <= 15000:
    diff = "Medium-Hard"
else:
    diff = "Medium"

prompt = f"""
You are a senior JEE Advanced problem setter from IIT.

Generate a JEE test for a student targeting AIR {req.rank} with {req.n} questions.

Subject: {req.subject}
Chapter: {req.chapter}
Topic: {req.topic}

STRICT RULES:
- NO simple formula substitution questions
- Multi-step reasoning required
- Tricky JEE pattern problems

OUTPUT STRICT JSON:
{{
  "questions": [
    {{
      "id": 1,
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "B",
      "solution": "Detailed step-by-step explanation"
    }}
  ]
}}
"""


Subject: {req.subject}
Chapter: {req.chapter}
Topic: {req.topic}

STRICT RULES:
- NO simple formula substitution questions
- NO single-step problems
- Each question must require:
  - Multi-step reasoning
  - Concept linking
  - Numerical solving
  - JEE exam level thinking

OUTPUT STRICT JSON:
{{
  "questions": [
    {{
      "id": 1,
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "B",
      "solution": "Very detailed step-by-step explanation"
    }}
  ]
}}
"""

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.9
    )

    raw = response.choices[0].message.content

    try:
        return json.loads(raw)
    except:
        return {"error": "AI JSON parse failed", "raw": raw}
