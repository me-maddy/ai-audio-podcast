import os
from pydantic_settings import BaseSettings

class AppConfig(BaseSettings):
    mongo_db_url: str = ""
    openai_api_key: str = ""
    elevenlabs_api_key: str = ""
    elevenlabs_voice_id: str = ""
    gemini_api_key: str = ""

    class Config:
        env_file = ".env"

app_config_obj = AppConfig()