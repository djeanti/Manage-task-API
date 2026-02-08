# tests/conftest.py
# Test configuration and fixtures
# Sets up isolated SQLite database for testing

import sys
from pathlib import Path
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add parent directory to Python path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from app.database import Base, get_db
from app.main import app

# SQLite test database (isolated from production PostgreSQL)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    """
    Override database dependency for testing
    Uses test SQLite database instead of production PostgreSQL
    """
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Replace production database with test database
app.dependency_overrides[get_db] = override_get_db

# Create test database tables
Base.metadata.create_all(bind=engine)

@pytest_asyncio.fixture
async def client():
    """
    Async HTTP client fixture for testing API endpoints
    
    Yields:
        AsyncClient: HTTP client for making test requests
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c