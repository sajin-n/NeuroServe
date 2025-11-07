from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # GROQ API key for chat/ML API integrations. Set this in backend/.env or in your environment.
    GROQ_API_KEY: Optional[str] = None

    model_config = {
        # Look for a .env file in the backend folder by default
        'env_file': '.env',
        'env_file_encoding': 'utf-8'
    }


settings = Settings()
