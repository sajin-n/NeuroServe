@echo off
start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && set PYTHONPATH=. && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"