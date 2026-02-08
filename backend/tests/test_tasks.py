# tests/test_tasks.py
# Integration tests for Task API endpoints
# Tests CRUD operations (Create, Read, Update, Delete)

import pytest

# Global variable to store created task ID for reuse in tests
task_id = None

@pytest.mark.asyncio
async def test_create_task(client):
    """
    Test creating a new task
    Verifies task is created with correct title and default completed=False
    """
    global task_id
    data = {"title": "Test Task"}
    response = await client.post("/tasks/", json=data)
    assert response.status_code == 200
    result = response.json()
    assert result["title"] == "Test Task"
    assert result["completed"] is False
    task_id = result["id"]  # Store ID for subsequent tests

@pytest.mark.asyncio
async def test_get_tasks(client):
    """
    Test retrieving all tasks
    Verifies response is a non-empty list
    """
    response = await client.get("/tasks/")
    assert response.status_code == 200
    tasks = response.json()
    assert isinstance(tasks, list)
    assert len(tasks) > 0

@pytest.mark.asyncio
async def test_get_task_by_id(client):
    """
    Test retrieving a specific task by ID
    Verifies correct task is returned
    """
    response = await client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    task = response.json()
    assert task["id"] == task_id

@pytest.mark.asyncio
async def test_update_task(client):
    """
    Test updating a task using PATCH
    Verifies title and completed status are updated correctly
    """
    data = {"title": "Updated Task", "completed": True}
    response = await client.patch(f"/tasks/{task_id}", json=data)
    assert response.status_code == 200
    task = response.json()
    assert task["title"] == "Updated Task"
    assert task["completed"] is True

@pytest.mark.asyncio
async def test_delete_task(client):
    """
    Test deleting a task
    Verifies task is deleted and returns 404 on subsequent GET
    """
    response = await client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    task = response.json()
    assert task["id"] == task_id

    # Verify task no longer exists
    response = await client.get(f"/tasks/{task_id}")
    assert response.status_code == 404