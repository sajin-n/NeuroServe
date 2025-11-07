# NeuroServe

A full-stack web application with real-time chat capabilities and machine learning integration using FastAPI and Next.js.

## Project Structure

```
NeuroServe/
├── backend/                  # FastAPI Backend
│   ├── routers/             # API route modules
│   │   ├── ml.py           # ML and chat endpoints
│   │   └── __init__.py
│   ├── config.py           # Environment configuration
│   ├── main.py            # FastAPI app entry point
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   └── components/   # React components
│   └── package.json      # Node.js dependencies
├── k8s/                  # Kubernetes configurations
├── .gitignore           # Git ignore rules
├── start-dev.bat        # Development startup script
└── README.md           # This file
```

## Prerequisites

- Python 3.12+
- Node.js 18+
- npm or yarn
- Git

## Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd NeuroServe
```

2. Backend Setup:
```bash
# Create and activate virtual environment
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On Unix/MacOS
source .venv/bin/activate

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

3. Frontend Setup:
```bash
cd frontend
npm install
```

4. Environment Configuration:
```bash
# Copy example env file
cp backend/.env.example backend/.env

# Add your GROQ API key to backend/.env
GROQ_API_KEY=your_api_key_here
```

## Running the Application

### Using the Development Script

Run both frontend and backend using the provided script:
```bash
./start-dev.bat
```

### Manual Start

1. Start the Backend:
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Start the Frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Features

- Real-time chat using WebSocket
- ML integration with GROQ API
- Modern React components with TypeScript
- FastAPI backend with async support
- Environment-based configuration
- Cross-Origin Resource Sharing (CORS) enabled
- API documentation with Swagger UI

## API Endpoints

- `GET /`: Health check endpoint
- `GET /api/ml/key-status`: Check GROQ API key configuration
- `POST /api/ml/predict`: Example ML prediction endpoint
- `WS /ws`: WebSocket endpoint for real-time chat
- More endpoints documented in Swagger UI at `/docs`

## Development

### Adding New Features

1. Backend:
- Add new routers in `backend/routers/`
- Update `main.py` to include new routers
- Run tests with pytest (when added)

2. Frontend:
- Add new components in `frontend/src/components/`
- Add new pages in `frontend/src/app/`
- Use TypeScript for type safety

### Environment Variables

Backend (`.env`):
- `GROQ_API_KEY`: Your GROQ API key for ML/chat features

Frontend (`.env.local`):
- Add as needed for frontend configuration

## Docker Support

Coming soon:
- Dockerfile for backend
- Dockerfile for frontend
- Docker Compose configuration

## Kubernetes

Basic K8s configurations are provided in the `k8s/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Security Notes

- Never commit `.env` files or API keys
- Use environment variables for secrets
- Keep dependencies updated
- Follow security best practices

## License

[Add your chosen license here]

## Contact

[Add your contact information here]