import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data);
  };

  const deleteBlog = async () => {
    await API.delete(`/blogs/${id}`);
    navigate('/');
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const isAuthor = blog.author._id === JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;

  return (
    <div>
      <h2 className="text-2xl font-bold">{blog.title}</h2>
      <p className="mt-2">{blog.content}</p>
      <p className="mt-4 text-sm text-gray-600">By {blog.author.email}</p>
      {isAuthor && (
        <div className="mt-4 space-x-2">
          <Link to={`/edit/${blog._id}`} className="text-blue-600 underline">Edit</Link>
          <button onClick={deleteBlog} className="text-red-600 underline">Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
