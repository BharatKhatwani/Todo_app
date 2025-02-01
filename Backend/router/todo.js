const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../Controller/todoController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');  // Import auth middleware

// Create a new Todo
router.post('/', authMiddleware, createTodo);

// Get all Todos for the logged-in user
router.get('/', authMiddleware, getTodos);

// Update a Todo by id
router.put('/:id', authMiddleware, updateTodo);

// Delete a Todo by id
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;
