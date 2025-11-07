from fastapi import FastAPI, WebSocket, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional, List
import uvicorn
import json
from backend.routers import ml

app = FastAPI(title="NeuroServe API", version="1.0.0")

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ml.router, prefix="/api/ml", tags=["ML"])

# Basic API health check endpoint
@app.get("/")
async def read_root():
    return {"status": "healthy", "service": "NeuroServe API"}

# Example protected endpoint (will be secured with JWT later)
@app.get("/api/protected")
async def protected_route():
    return {"message": "This is a protected route"}

# WebSocket endpoint for real-time communication
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Echo the message back for now
            await websocket.send_text(f"Message received: {data}")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)