const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, getSharedTodos } = require("../repositories/todoRepository");
const { logActivity } = require("./activityService");

exports.getAllTodos = async (userId) => {
  return getAllTodos(userId);
}

exports.getSharedTodos = async () => {
  return getSharedTodos();
}

exports.getTodo = async (todoId) => {
  return getTodo(todoId);
}

exports.createTodo = async (io, userId, todoBody) => {
  const { name, description, dueDate, status, priority, isShared } = todoBody;
  const newTodo = await createTodo(userId, name, description, dueDate, status, priority, isShared);
  // Emit created new TODO
  if (isShared) {
    io.emit('newSharedTodo', newTodo);
  }

  // Log activity
  logActivity('CREATE', newTodo._id, userId);

  return newTodo;
}

exports.updateTodo = async (io, todoId, todo, userId) => {
  const updatedTodo = await updateTodo(todoId, todo)
  if (!updatedTodo) throw new Error('Todo not found');
  // Emit updated TODO
  if (updatedTodo.isShared) {
    io.emit('updatedSharedTodo', updatedTodo);
  }

  // Log activity
  logActivity('UPDATE', todoId, userId);

  return updatedTodo;
}

exports.deleteTodo = async (io, todoId, userId) => {
  const deletedTodo = await deleteTodo(todoId);
  if (!deletedTodo) throw new Error('Todo not found');
  // Emit deleted TODO
  if (deletedTodo.isShared) {
    io.emit('deletedSharedTodo', todoId);
  }

  // Log activity
  logActivity('DELETE', todoId, userId);
}
