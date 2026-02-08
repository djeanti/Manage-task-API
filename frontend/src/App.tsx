// src/App.tsx
// Main application component
// Renders the TaskList as the root component

import React from "react";
import TaskList from "./components/TaskList/TaskList";

const App: React.FC = () => {
  return (
    <div>
      <TaskList />
    </div>
  );
};

export default App;