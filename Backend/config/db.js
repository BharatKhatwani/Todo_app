// This file is responsible for making the connection!

const mongoose = require('mongoose');

// Define the MongoDB connection URL
 const mongoURL = process.env.MONGO_URL;;        // env file use 

if (!mongoURL) {
  console.error("Error: MONGO_URL is not defined in the .env file");
  process.exit(1); // Exit the process if the URL is missing
}

// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });

const db = mongoose.connection;

// Disconnection event
db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

module.exports = db;
