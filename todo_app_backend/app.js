const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

module.exports = app;
