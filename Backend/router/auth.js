const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username, password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userFind = await User.findOne({ username });
        
        if (!userFind) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFind.password); // Corrected reference to userFind
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Correct JWT signing
        const token = jwt.sign(
            { userId: userFind._id }, // The payload
            process.env.JWT_SECRET,    // Use secret key from environment variables
                 // Token expiration
        );

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
});

module.exports = router;
