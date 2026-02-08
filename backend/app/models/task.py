# app/models/task.py
# SQLAlchemy model for Task entity
# Defines the database table structure

from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class Task(Base):
    """Task model representing a todo item in the database"""
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)