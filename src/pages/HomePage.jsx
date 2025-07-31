import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Body from '../components/Body.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const HomePage = () => {
  return (
    <div className="container-fluid">
       <div className="bg-primary text-white text-center py-3">
        <h1 className="m-0">Time Tracking App</h1>
      </div>
      <div className="row">
        {/* Sidebar Navbar */}
        <div className="col-md-3 col-lg-2 bg-light min-vh-100 p-3">
          <Navbar />
        </div>

        {/* Main Content Body */}
        <div className="col-md-9 col-lg-10 p-4">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
