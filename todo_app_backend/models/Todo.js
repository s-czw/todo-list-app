const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['NotStarted', 'InProgress', 'Completed'], default: 'NotStarted' },
  priority: { type: String, required: true, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  createdAt: { type: Date, required: true, default: new Date() },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Todo', todoSchema);
