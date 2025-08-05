// src/pages/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      const res = await API.get(`/blogs?page=${page}&limit=3`);
      setBlogs(res.data.blogs || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-violet-500 drop-shadow-lg">
      Discover stories
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No blogs found.</div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{blog.title}</h2>
                  <p className="text-gray-600 line-clamp-4">{blog.content}</p>
                  <p className="mt-4 text-right text-violet-500 font-medium">Continue Reading →</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="relative mt-12 flex justify-center items-center">
            {/* Left Pagination Button */}
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="absolute left-0 bg-violet-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-teal-500 disabled:opacity-50"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
                alt="Previous"
                className="w-4 h-4 invert"
              />
            </button>

            <span className="text-gray-700 font-medium text-lg px-6">
               {currentPage} of {totalPages}
            </span>

            {/* Right Pagination Button */}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="absolute right-0 bg-violet-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-teal-500 disabled:opacity-50"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
                alt="Next"
                className="w-4 h-4 invert"
              />
            </button>
          </div>

        </>
      )}
    </div>
  );
}

export default BlogList;
