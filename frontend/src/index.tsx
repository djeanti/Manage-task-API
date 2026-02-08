// src/index.tsx
// Application entry point
// Renders the App component into the DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root DOM element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the app with StrictMode enabled for development warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);