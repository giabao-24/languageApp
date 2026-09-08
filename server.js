const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const TestRoute = require('./routes/TestRoute');
const UserRoute = require('./routes/UserRoute');
const ResultRoute = require('./routes/ResultRoute');

// Middleware
app.use(cors());
app.use(express.json());

const connectDB = require('./config/config');

connectDB();
// Routes
app.use('/api', TestRoute);
app.use('/api/users', UserRoute);
app.use('/api', ResultRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});