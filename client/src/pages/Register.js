import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full border p-2" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="bg-blue-600 text-white px-4 py-2">Register</button>
    </form>
  );
};

export default Register;
