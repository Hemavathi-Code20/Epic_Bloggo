const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

dotenv.config();

const app = express(); // ✅ Define app first

// ✅ Enable CORS before any routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => console.error(err));
