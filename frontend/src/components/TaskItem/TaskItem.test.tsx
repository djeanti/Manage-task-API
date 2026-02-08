// src/components/TaskItem/TaskItem.test.tsx
// Unit tests for TaskItem component
// Tests rendering, editing, and deleting functionality

import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";
import * as taskService from "../../services/taskService";

// Mock the taskService module
jest.mock("../../services/taskService", () => ({
  ...jest.requireActual("../../services/taskService"),
  updateTask: jest.fn(),
}));

describe("TaskItem", () => {
  // Mock data and callback functions
  const mockTask = { id: 1, title: "Test task" };
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock updateTask to return a resolved task
    (taskService.updateTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Modified task",
    });
  });

  /**
   * Test: Component displays the task title correctly
   */
  test("shows the title of the task", () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />);
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  /**
   * Test: Delete button triggers onDelete callback
   */
  test("calls onDelete when we click on Delete", () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  /**
   * Test: Edit and save functionality works correctly
   */
  test("calls onUpdate when we edit and save", async () => {
    render(<TaskItem task={mockTask} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />);
    
    // Click Edit button
    fireEvent.click(screen.getByText("Edit"));
    
    // Modify the input field
    const input = screen.getByDisplayValue("Test task");
    fireEvent.change(input, { target: { value: "Modified task" } });
    
    // Click Save button
    fireEvent.click(screen.getByText("Save"));
    
    // Wait for async updateTask to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      id: 1,
      title: "Modified task",
    });
  });
});