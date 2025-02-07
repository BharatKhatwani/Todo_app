// ✅ Create a To-Do
const Todo = require('../model/Todo.js')
const mongoose = require('mongoose');


const createTodo = async (req, res) => {
    try {
        console.log("Decoded User:", req.user);  // Debugging line

        const { userId, title, description } = req.body; 
        if (!req.user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!title || !description) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newTodo = new Todo({
            User: new mongoose.Types.ObjectId(userId),  // Ensure this is correct (req.user.userId)
            title,
            description,
        });

        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating todo", error });
    }
};

// ✅ Get Todos for a user
const getTodos = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "User not found" });
        }

        const todos = await Todo.find({ user: req.user.userId });  // Changed 'User' to 'user'
        res.status(200).json(todos);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching todos", error });
    }
};

// ✅ Update a To-Do
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, complete } = req.body;

        const todoFind = await Todo.findById(id);
        if (!todoFind) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Check if the user owns the todo
        if (todoFind.user.toString() !== req.user.userId.toString()) {  // Changed 'User' to 'user'
            return res.status(403).json({ message: "Unauthorized action" });
        }

        // Update fields only if provided
        if (title) todoFind.title = title;
        if (description) todoFind.description = description;
        if (complete !== undefined) todoFind.complete = complete;

        await todoFind.save();
        res.status(200).json({ message: "Todo updated successfully", todo: todoFind });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update todo error", error });
    }
};

// ✅ Delete a To-Do
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todoFind = await Todo.findById(id);
        if (!todoFind) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Check if the user owns the todo
        if (todoFind.user.toString() !== req.user.userId.toString()) {  // Changed 'User' to 'user'
            return res.status(403).json({ message: "Unauthorized action" });
        }

        await Todo.deleteOne({ _id: id });
        res.status(200).json({ message: "Todo deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting todo", error });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
