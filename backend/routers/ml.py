from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
from typing import List
from backend.config import settings

router = APIRouter()

class PredictionInput(BaseModel):
    features: List[float]

class PredictionOutput(BaseModel):
    prediction: float
    probability: float

# Dummy ML model for demonstration
class DummyModel:
    def predict(self, X):
        return np.random.randint(0, 2, size=len(X))
    
    def predict_proba(self, X):
        return np.random.random(size=(len(X), 2))

# Initialize dummy model
model = DummyModel()


@router.get("/key-status")
async def key_status():
    """Return whether a GROQ API key is configured (boolean). This does NOT return the key itself."""
    return {"has_groq_key": bool(settings.GROQ_API_KEY)}

@router.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    try:
        features = np.array(input_data.features).reshape(1, -1)
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0].max()
        
        return PredictionOutput(
            prediction=float(prediction),
            probability=float(probability)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))