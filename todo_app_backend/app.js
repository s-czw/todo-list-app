const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoute');
const todoRoutes = require('./routes/todoRoute');
const activityRoutes = require('./routes/activityRoute');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle TODO update
  socket.on('updateSharedTodo', (updatedTodo) => {
    io.emit('updatedSharedTodo', updatedTodo);
  });

  // Handle TODO deletion
  socket.on('deleteSharedTodo', (todoId) => {
    io.emit('deletedSharedTodo', todoId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.io = io;

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/activity', activityRoutes);

module.exports = server;
