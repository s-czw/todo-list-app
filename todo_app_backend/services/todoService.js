const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("../repositories/todoRepository");

exports.getAllTodos = async (userId) => {
  return getAllTodos(userId);
}

exports.getTodo = async (todoId) => {
  return getTodo(todoId);
}

exports.createTodo = async (userId, todoBody) => {
  const { name, description, dueDate, status, priority } = todoBody;
  return createTodo(userId, name, description, dueDate, status, priority);
}

exports.updateTodo = async (todoId, todo) => {
  const updatedTodo = updateTodo(todoId, todo)
  if (!updatedTodo) throw new Error('Todo not found');
  return updatedTodo;
}

exports.deleteTodo = async (todoId, userId) => {
  const deletedTodo = deleteTodo(todoId, userId);
  if (!deletedTodo) throw new Error('Todo not found');
}
