// src/services/taskService.ts
// Service layer for task API operations
// Handles all HTTP requests to the Django REST API

export interface Task {
  id: number;
  title: string;
}

const API_URL = "http://127.0.0.1:8000/tasks/";

/**
 * Fetches all tasks from the API
 * @returns Promise<Task[]> Array of tasks
 * @throws Error if request fails
 */
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Creates a new task
 * @param title - The task title
 * @returns Promise<Task> The created task object
 * @throws Error if creation fails
 */
export const createTask = async (title: string): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error(`Error creating task: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Updates an existing task
 * @param id - Task ID to update
 * @param title - New task title
 * @returns Promise<Task> The updated task object
 * @throws Error if update fails
 */
export const updateTask = async (id: number, title: string): Promise<Task> => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Deletes a task by ID
 * @param id - Task ID to delete
 * @returns Promise<boolean> True if deletion succeeded, false otherwise
 */
export async function deleteTask(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}${id}`, { method: "DELETE" });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}