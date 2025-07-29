import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <div className="d-flex flex-column gap-2">
        <Link to="/home" className="btn btn-outline-primary">Dashboard</Link>
        <Link to="/projects" className="btn btn-outline-primary">Projects</Link>
        <Link to="/profile" className="btn btn-outline-primary">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
