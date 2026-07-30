
from fastapi import FastAPI

app = FastAPI(title="AI Memory Assistant API")

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }
