import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Ensure the root element is ready before mounting
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("DOM Error: Failed to find #root element. Application cannot mount.");
}