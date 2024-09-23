const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../services/todoService');

exports.getAllTodos = async (req, res) => {
  try {
    res.status(200).json(await getAllTodos(req.user.userId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    res.statis(200).json(await getTodo(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    res.status(201).json(await createTodo(req.user.userId, req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    res.status(200).json(await updateTodo(req.params.id, req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await deleteTodo(req.params.id, req.user.userId);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
