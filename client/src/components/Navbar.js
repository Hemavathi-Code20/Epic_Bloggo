import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <Link to="/" className="font-bold text-xl">MERN Blog</Link>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/create">Create</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
