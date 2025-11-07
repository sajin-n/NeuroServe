import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "NeuroServe API"}

def test_ml_predict():
    response = client.post(
        "/api/ml/predict",
        json={"features": [1.0, 2.0, 3.0, 4.0]}
    )
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "probability" in data
    assert isinstance(data["prediction"], float)
    assert isinstance(data["probability"], float)
    assert 0 <= data["probability"] <= 1