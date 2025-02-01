require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const app = express();
const db = require('./config/db'); // Ensure correct path
const cors = require('cors'); // Allow cross-origin requests
const helmet = require('helmet'); // Secure HTTP headers

// Importing routes
const authRoute = require('./router/auth.js'); 
const todoRouter = require('./router/todo.js'); 
const userRouter = require('./router/user.js')
// Importing middleware
const authMiddleware = require('./middlewares/authMiddleware.js'); 

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Improve security

// Set up routes
app.use('/auth', authRoute); // Public routes (Register/Login)
app.use('/todos',  todoRouter); 
app.use('/users', userRouter) 
const verifyToken = require('./middlewares/authMiddleware');  // Make sure the correct path is used
app.use(verifyToken);


// Set up the port and start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
