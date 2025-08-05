import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
