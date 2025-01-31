const mongoose = require('mongoose');
const User = require('./User.js'); // Correct reference to User model

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Correct reference
        required: true,
    },
}, { timestamps: true });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
