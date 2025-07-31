// src/App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx'
import ProjectPage from './pages/ProjectPage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import LoginPage from './pages/LoginPage.jsx';     
import RegisterPage from './pages/RegisterPage.jsx'; 
import ProfilePage from './pages/ProfilePage.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:projectId/tasks" element={<TaskPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
};

export default App;
