# app/database.py
# Database configuration and session management
# Handles PostgreSQL connection with custom schema

from sqlalchemy import create_engine, event
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

DATABASE_URL = settings.database_url

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Force PostgreSQL schema for all connections
@event.listens_for(engine, "connect")
def set_search_path(dbapi_connection, connection_record):
    """Set PostgreSQL search_path to custom schema on every connection"""
    cursor = dbapi_connection.cursor()
    cursor.execute('SET search_path TO factorytasks_schema;')
    cursor.close()

# Session factory for database connections
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for SQLAlchemy models
Base = declarative_base()

def get_db():
    """
    Dependency function for FastAPI to get database session
    
    Yields:
        Session: SQLAlchemy database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()