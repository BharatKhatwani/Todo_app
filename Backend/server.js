const express = require('express');
const app = express();
const db = require('./config/db');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
app.use(express.json())

// app.use(body_parser.json());


// const authRouter = require('./router/auth.js')
// app.use('/auth',  authRouter);

// const todoRouter = require('./router/todo.js')
// app.use('/todo' , todoRouter);

// const front = require("./Controller/authController.js")


const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});