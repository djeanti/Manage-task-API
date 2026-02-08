// src/components/TaskList/TaskList.tsx
// Main component for displaying and managing the task list
// Handles task creation, updates, and deletion

import React, { useEffect, useState } from "react";
import { Task, getTasks, createTask, deleteTask } from "../../services/taskService";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

const TaskList: React.FC = () => {
  // State for storing tasks array
  const [tasks, setTasks] = useState<Task[]>([]);
  // State for new task input field
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetches all tasks from API and updates state
   */
  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  /**
   * Handles adding a new task
   * Validates input and creates task via API
   */
  const handleAdd = async () => {
    if (!newTask.trim()) return; // Prevent empty tasks
    const created = await createTask(newTask);
    if (created) setTasks([...tasks, created]);
    setNewTask(""); // Clear input field
  };

  /**
   * Handles updating a task
   * @param updated - The updated task object
   */
  const handleUpdate = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  /**
   * Handles deleting a task
   * @param id - ID of task to delete
   */
  const handleDelete = async (id: number) => {
    const success: boolean = await deleteTask(id);
    if (success) setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.taskList}>
      <h2>Task List</h2>
      
      {/* Add new task section */}
      <div className={styles.addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      
      {/* Render each task */}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;