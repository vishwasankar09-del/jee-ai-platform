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
You are a JEE question paper generator.

STRICT RULES:
- Output ONLY valid JSON.
- Do NOT include explanations.
- Do NOT include markdown.
- Do NOT include any text before or after JSON.

Generate {req.n} JEE {req.subject} questions
Chapter: {req.chapter}
Topic: {req.topic}
Difficulty rank: {req.rank}

Output format:
{{
  "questions": [
    {{
      "q": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "..."
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
        return {"error": "AI JSON parse failed", "raw": raw} """
