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
  const user1 = new User({
    email: 'admin@email.com',
    password: 'password123',
    role: 'Admin'
  });
  await user1.save();

  const user2 = new User({
    email: 'test@email.com',
    password: 'test123',
    role: 'User'
  });
  await user2.save();

  // Create sample TODOs
  const todos = [
    {
      name: 'First TODO',
      description: 'This is the first TODO item',
      dueDate: new Date('2024-09-30'),
      status: 'NotStarted',
      priority: 'Medium',
      isShared: false,
      createdBy: user1._id
    },
    {
      name: 'Second TODO',
      description: 'This is the second TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'High',
      isShared: false,
      createdBy: user1._id
    },
    {
      name: 'Third TODO',
      description: 'This is the third TODO item',
      dueDate: new Date('2024-10-17'),
      status: 'InProgress',
      priority: 'Low',
      isShared: false,
      createdBy: user1._id
    },
    {
      name: 'Forth TODO',
      description: 'This is the forth TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'High',
      isShared: false,
      createdBy: user1._id
    },
    {
      name: 'Fifth TODO',
      description: 'This is the fifth TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'High',
      isShared: false,
      createdBy: user1._id
    },
    {
      name: 'Sixth TODO',
      description: 'This is the sixth TODO item',
      dueDate: new Date('2024-11-15'),
      status: 'InProgress',
      priority: 'High',
      isShared: true,
      createdBy: user1._id
    },
    {
      name: 'User First TODO',
      description: 'This is the user first TODO item',
      dueDate: new Date('2024-09-29'),
      status: 'Completed',
      priority: 'Low',
      isShared: true,
      createdBy: user2._id
    },
    {
      name: 'User Second TODO',
      description: 'This is the user second TODO item',
      dueDate: new Date('2024-10-15'),
      status: 'InProgress',
      priority: 'Low',
      isShared: true,
      createdBy: user2._id
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
