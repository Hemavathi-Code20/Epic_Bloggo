import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full border p-2" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
