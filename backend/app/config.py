# app/config.py
# Application configuration using Pydantic settings
# Loads environment variables from .env file

from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    """Application settings with environment variable support"""
    database_url: str = "postgresql://factoryuser:pass123@localhost/factorytasks?options=-csearch_path%3Dfactorytasks_schema"

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

# Global settings instance
settings = Settings()