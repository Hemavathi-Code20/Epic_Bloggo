const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({ title, content, author: req.user.id });
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 3; 
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate('author', 'email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      blogs,
      total,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'email');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();

        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await blog.deleteOne(); // ✅ Updated from blog.remove()
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        console.error('Delete Blog Error:', err.message); // ✅ Debug log
        res.status(500).json({ message: 'Server error' });
    }
};
