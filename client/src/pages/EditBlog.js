import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        alert('Error loading blog');
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, { title, content });
      navigate(`/blogs/${id}`);
    } catch (err) {
      alert('Error updating blog');
    }
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Edit Blog</h2>
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
      <button className="bg-green-600 text-white px-4 py-2">Update</button>
    </form>
  );
};

export default EditBlog;
