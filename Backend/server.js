const dotenv = require('dotenv');
dotenv.config();  // This should be at the top to load env variables before any other require

const express = require('express');
const app = express();
const db = require('./config/db');

// Importing routes
const UserRoute = require('./router/user.js');
const todoRouter = require('./router/todo.js');

// Middleware to handle JSON body parsing
app.use(express.json());

const Middleware = require('./middleware/auth.js');

// Set up routes
app.use('/user', UserRoute); // No need for Middleware here (user registration & login should be public)
app.use('/todos', Middleware, todoRouter); // Apply Middleware only for protected routes

// Set up the port and start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
