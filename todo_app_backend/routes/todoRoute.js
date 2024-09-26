const express = require('express');
const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, getSharedTodos } = require('../controllers/todoController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getAllTodos);
router.get('/shared', authenticate, getSharedTodos);
router.get('/:id', authenticate, getTodo);
router.post('/', authenticate, authorize(['Admin', 'User']), createTodo);
router.put('/:id', authenticate, authorize(['Admin', 'User']), updateTodo);
router.delete('/:id', authenticate, authorize(['Admin', 'User']), deleteTodo);

module.exports = router;
