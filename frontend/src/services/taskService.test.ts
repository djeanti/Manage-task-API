// src/services/taskService.test.ts
// Unit tests for task service API functions
// Tests CRUD operations (Create, Read, Update, Delete)

import { getTasks, createTask, deleteTask, updateTask } from "./taskService";

// Mock the global fetch function
global.fetch = jest.fn();

describe("taskService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    (fetch as jest.Mock).mockClear();
  });

  /**
   * Test: getTasks successfully fetches tasks from API
   */
  test("getTasks fetch works correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Task 1" }],
    });
    const tasks = await getTasks();
    expect(tasks).toEqual([{ id: 1, title: "Task 1" }]);
  });

  /**
   * Test: createTask successfully creates a new task
   */
  test("createTask fetch works correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 2, title: "New task" }),
    });
    const result = await createTask("New task");
    expect(result).toEqual({ id: 2, title: "New task" });
    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/tasks/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ title: "New task" }),
      })
    );
  });

  /**
   * Test: deleteTask successfully deletes a task
   */
  test("deleteTask fetch works correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    const result = await deleteTask(1);
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/tasks/1",
      { method: "DELETE" }
    );
  });

  /**
   * Test: updateTask successfully updates a task
   */
  test("updateTask fetch works correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, title: "Modified" }),
    });
    const result = await updateTask(1, "Modified");
    expect(result).toEqual({ id: 1, title: "Modified" });
    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/tasks/1/",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ title: "Modified" }),
      })
    );
  });
});