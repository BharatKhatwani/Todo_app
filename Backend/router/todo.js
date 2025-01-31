const express = require('express');
const router = express.Router();

// Import Controller Functions
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('../Controller/todoController.js');

// Route for creating a Todo
router.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = await createTodo(title, description);  // Assuming this function will return a todo
        res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred", error });
    }
});

// Route for getting all Todos
router.get('/take', async (req, res) => {
    try {
        const todos = await getTodos();  // Assuming this function will return all todos
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred", error });
    }
});

// Route for getting a Todo by ID
router.get('/take/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await getTodoById(id);  // Assuming this function will return a specific todo by its ID
        res.status(200).json({ message: "Todo fetched successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred", error });
    }
});

// Route for updating a Todo
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const todo = await updateTodo(id, title, description);  // Assuming this function will update the todo
        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred", error });
    }
});

// Route for deleting a Todo
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await deleteTodo(id);  // Assuming this function will delete the todo
        res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred", error });
    }
});

module.exports = router;
