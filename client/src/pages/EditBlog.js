import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, blog);
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={blog.title} onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea name="content" value={blog.content} onChange={handleChange} rows={8}
          className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-300">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
