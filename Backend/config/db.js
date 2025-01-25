const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = "mongodb+srv://bharatkhatwani796:7pMYqtd2bLExONOT@cluster0.eto8x.mongodb.net/";

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
