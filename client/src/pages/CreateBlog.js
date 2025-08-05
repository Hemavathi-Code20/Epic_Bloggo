import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function CreateBlog() {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/blogs', blog);
      navigate('/');
    } catch (err) {
      alert('Failed to create blog');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Blog Title" value={blog.title} onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea name="content" placeholder="Blog Content" rows={8} value={blog.content} onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button
          type="submit"
          className="bg-gradient-to-r from-teal-300 via-indigo-200 px-6 py-2 rounded transition duration-300"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
