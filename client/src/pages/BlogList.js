import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchBlogs = async () => {
    const res = await API.get(`/blogs?page=${page}`);
    setBlogs(res.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id} className="border p-4 mb-4 rounded shadow">
          <Link to={`/blogs/${blog._id}`}>
            <h3 className="text-xl font-semibold">{blog.title}</h3>
          </Link>
          <p>by {blog.author.email}</p>
        </div>
      ))}
      <div className="flex gap-2 mt-4">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="bg-gray-200 px-3 py-1">Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} className="bg-gray-200 px-3 py-1">Next</button>
      </div>
    </div>
  );
};

export default BlogList;
