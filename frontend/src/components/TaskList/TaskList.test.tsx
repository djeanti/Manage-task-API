// src/components/TaskList/TaskList.test.tsx
// Unit tests for TaskList component
// Tests task fetching and deletion

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";
import * as taskService from "../../services/taskService";

// Mock task data for testing
const mockTasks = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
];

// Mock the entire taskService module
jest.mock("../../services/taskService");

describe("TaskList", () => {
  beforeEach(() => {
    // Setup mock responses for each test
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);
    (taskService.deleteTask as jest.Mock).mockResolvedValue(true);
  });

  /**
   * Test: Component fetches and displays all tasks
   */
  test("displays all tasks retrieved from the service", async () => {
    render(<TaskList />);
    expect(await screen.findByText("Task 1")).toBeInTheDocument();
    expect(await screen.findByText("Task 2")).toBeInTheDocument();
  });

  /**
   * Test: Delete button calls deleteTask service
   */
  test("deletes a task when you click the Delete button", async () => {
    render(<TaskList />);
    const deleteButtons = await screen.findAllByText("Delete");
    
    // Click the first delete button
    await waitFor(() => {
      fireEvent.click(deleteButtons[0]);
    });
    
    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
  });
});