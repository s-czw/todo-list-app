const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Todo = require('../models/Todo');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Todo.deleteMany({});

  // Create a new user
  const user = new User({
    email: 'admin@email.com',
    password: 'password123',
    role: 'Admin'
  });
  await user.save();

  // Create sample TODOs
  const todos = [
    {
      name: 'First TODO',
      description: 'This is the first TODO item',
      dueDate: new Date('2024-09-30'),
      status: 'NotStarted',
      priority: 'Medium',
      createdBy: user._id
    },
    {
      name: 'Second TODO',
      description: 'This is the second TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'High',
      createdBy: user._id
    },
    {
      name: 'Third TODO',
      description: 'This is the third TODO item',
      dueDate: new Date('2024-10-17'),
      status: 'InProgress',
      priority: 'Low',
      createdBy: user._id
    },
    {
      name: 'Forth TODO',
      description: 'This is the forth TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'High',
      createdBy: user._id
    },
    {
      name: 'Fifth TODO',
      description: 'This is the fifth TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'High',
      createdBy: user._id
    },
    {
      name: 'Sixth TODO',
      description: 'This is the sixth TODO item',
      dueDate: new Date('2024-11-15'),
      status: 'InProgress',
      priority: 'High',
      createdBy: user._id
    }
  ];

  await Todo.insertMany(todos);

  console.log('Database seeded!');
  process.exit();
})
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});
