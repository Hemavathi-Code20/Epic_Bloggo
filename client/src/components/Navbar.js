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
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-teal-300 via-indigo-200 to-slate-300 shadow-md">
      <Link to="/" className="font-bold text-xl text-gray-800">Epic_Bloggo</Link>
      <div className="space-x-6 text-gray-700 font-medium">
        {token ? (
          <>
            <Link to="/create" className="hover:text-gray-900 transition duration-200">Create Blog</Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-600 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-900 transition duration-200">Login</Link>
            <Link to="/register" className="hover:text-gray-900 transition duration-200">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
