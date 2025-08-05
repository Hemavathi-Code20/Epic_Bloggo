import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };

    const decodeToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id || payload._id);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    };

    fetchBlog();
    decodeToken();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Error deleting blog:', err.response?.data || err.message);
    }
  };

  if (!blog) return <div className="text-center mt-10">Loading...</div>;

  const isAuthor =
    currentUserId === blog.author ||
    currentUserId === blog.author?._id;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">{blog.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

      {isAuthor && (
        <div className="flex justify-end gap-4 mt-6">
          <Link to={`/edit/${blog._id}`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
