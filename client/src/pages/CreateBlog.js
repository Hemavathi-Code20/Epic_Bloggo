import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/blogs', { title, content });
      navigate('/');
    } catch (err) {
      alert('Error creating blog');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Create Blog</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full border p-2 h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button className="bg-blue-600 text-white px-4 py-2">Publish</button>
    </form>
  );
};

export default CreateBlog;
