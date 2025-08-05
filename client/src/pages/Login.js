import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-300"
          >
            Login
          </button>
        </div>

      </form>
    </div>
  );
}

export default Login;
