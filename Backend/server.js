const dotenv = require('dotenv');
dotenv.config();  // Move this to the top of the file

const express = require('express');
const app = express();
const db = require('./config/db');

// Load environment variables from the .env file
dotenv.config();

// Importing routes



app.use(express.json());  // This handles JSON body parsing

// Set up routes
const todoRouter = require('./router/todo.js');
app.use('/todo', todoRouter);

// const db = require('./config/db');
// db.connect();  // Assuming db.js has a method to connect to your DB

// Set up the port and start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
