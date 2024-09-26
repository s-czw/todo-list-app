const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true, enum: ['CREATE', 'UPDATE', 'DELETE'] },
  todoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String },
  timestamp: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Activity', activitySchema);