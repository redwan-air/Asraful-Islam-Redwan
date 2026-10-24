import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Hero from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import Articles from './pages/Articles.tsx';
import About from './pages/About.tsx';

// Ensure the root element is ready before mounting
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Hero />} />
            <Route path="projects" element={<Projects />} />
            <Route path="articles" element={<Articles />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("DOM Error: Failed to find #root element. Application cannot mount.");
}