# app/routers/tasks.py
# API endpoints for task CRUD operations
# Handles HTTP requests for creating, reading, updating, and deleting tasks

from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskRead

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.post("/", response_model=TaskRead)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task
    
    Args:
        task: TaskCreate schema with title
        db: Database session dependency
    
    Returns:
        TaskRead: Created task object
    """
    task_db = Task(title=task.title, completed=False)
    db.add(task_db)
    db.commit()
    db.refresh(task_db)
    return task_db

@router.get("/", response_model=list[TaskRead])
def get_tasks(db: Session = Depends(get_db)):
    """
    Retrieve all tasks
    
    Args:
        db: Database session dependency
    
    Returns:
        list[TaskRead]: List of all tasks
    """
    return db.query(Task).all()

@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single task by ID
    
    Args:
        task_id: ID of the task to retrieve
        db: Database session dependency
    
    Returns:
        TaskRead: Task object
    
    Raises:
        HTTPException: 404 if task not found
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task_update: TaskUpdate = Body(...),
    db: Session = Depends(get_db)
):
    """
    Update a task (partial update with PATCH)
    
    Args:
        task_id: ID of the task to update
        task_update: TaskUpdate schema with optional fields
        db: Database session dependency
    
    Returns:
        TaskRead: Updated task object
    
    Raises:
        HTTPException: 404 if task not found
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update only provided fields
    if task_update.title is not None:
        task.title = task_update.title
    if task_update.completed is not None:
        task.completed = task_update.completed

    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", response_model=TaskRead)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task by ID
    
    Args:
        task_id: ID of the task to delete
        db: Database session dependency
    
    Returns:
        TaskRead: Deleted task object
    
    Raises:
        HTTPException: 404 if task not found
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return task