// src/components/TaskItem/TaskItem.tsx
// Individual task item component with edit/delete functionality
// Supports inline editing mode

import React, { useState } from "react";
import { Task, updateTask, deleteTask } from "../../services/taskService";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  // Toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);
  // Local state for edited title
  const [title, setTitle] = useState(task.title);

  /**
   * Saves the edited task title
   * Calls API to update task and notifies parent component
   */
  const handleSave = async () => {
    const updated = await updateTask(task.id, title);
    if (updated) onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <div className={styles.taskItem}>
      {isEditing ? (
        // Edit mode - show input and save/cancel buttons
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSave} className={styles.button}>Save</button>
          <button onClick={() => setIsEditing(false)} className={styles.button}>Cancel</button>
        </>
      ) : (
        // View mode - show title and edit/delete buttons
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)} className={styles.button}>Edit</button>
          <button onClick={() => onDelete(task.id)} className={styles.button}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;