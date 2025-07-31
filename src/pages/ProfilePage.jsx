// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');

    if (!token) {
      navigate('/login');
    }

    if (name) {
      setUserName(name);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      {/* Top Page Heading */}
      <div className="bg-primary text-white text-center py-3">
        <h1 className="m-0">Time Tracking App</h1>
      </div>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-light p-3" style={{ width: '250px', minHeight: '100vh' }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-light"
          style={{ minHeight: '100vh' }}
        >
          <div
            className="card shadow p-4"
            style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}
          >
            <div className="text-center mb-4">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile"
                className="rounded-circle"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
            <h4 className="text-center mb-2">Welcome, {userName}!</h4>
            <p className="text-muted text-center mb-4">
              Manage your profile and track your time efficiently.
            </p>
            <button onClick={handleLogout} className="btn btn-danger w-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
