const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../Controller/todoController.js');

// Create a new Todo
router.post('/', createTodo);

// Get all Todos or a single Todo by id
router.get('/:id', getTodos);  // Adjust according to what getTodos is doing (all or single)

// Update a Todo by id
router.put('/:id', updateTodo);

// Delete a Todo by id
router.delete('/:id', deleteTodo);

module.exports = router;
