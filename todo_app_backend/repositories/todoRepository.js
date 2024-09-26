const Todo = require("../models/Todo")

exports.getAllTodos = async (createdBy) => {
  return await Todo.find({ createdBy: createdBy, isShared: false });
}

exports.getSharedTodos = async () => {
  return await Todo.find({ isShared: true });
}

exports.getTodo = async (todoId) => {
  return await Todo.findOne({ _id: todoId });
}

exports.createTodo = async (userId, name, description, dueDate, status, priority, isShared, createdAt) => {
  if (!createdAt) createdAt = new Date();
  const newTodo = new Todo({ 
    name, description, dueDate, status, priority, isShared, createdAt, createdBy: userId
  });
  return await newTodo.save();
}

exports.updateTodo = async (todoId, toBeUpdated) => {
  return await Todo.findOneAndUpdate(
    { _id: todoId },
    toBeUpdated,
    { new: true }
  );
}

exports.deleteTodo = async (todoId) => {
  return await Todo.findOneAndDelete({ _id: todoId });
}
