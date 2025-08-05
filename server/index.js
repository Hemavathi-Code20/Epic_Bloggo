const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server running on port 5000');
    });
}).catch(err => console.error(err));
