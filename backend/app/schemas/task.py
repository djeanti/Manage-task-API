# app/schemas/task.py
# Pydantic schemas for request/response validation
# Defines data transfer objects (DTOs) for Task API

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class TaskCreate(BaseModel):
    """Schema for creating a new task"""
    title: str = Field(..., min_length=1)

class TaskUpdate(BaseModel):
    """Schema for updating an existing task (partial update)"""
    title: Optional[str] = None
    completed: Optional[bool] = None

class TaskRead(BaseModel):
    """Schema for reading task data (response model)"""
    id: int
    title: str
    completed: bool

    # Pydantic v2 configuration for ORM compatibility
    model_config = ConfigDict(from_attributes=True)