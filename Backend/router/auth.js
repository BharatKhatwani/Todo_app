const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Ensure correct path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load .env variables

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;  // Include `email`
        console.log('Request Body:', req.body);  // Log request body to check data

        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = new User({
            username, 
            email,   // Add `email`
            password: hashedPassword
        });

        console.log(user);
        console.log('Plain Password:', password);
        console.log('Hashed Password:', hashedPassword);

        // Save to DB
        await user.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log("Error in Register Route:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Search by username or email
        const user = await User.findOne({ $or: [{ username }, { email }] });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Entered Password:', password); // Check entered password
        console.log('Stored Hash:', user.password);  // Check stored hash in DB

        // Compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);


        console.log('Password Match:', isMatch); // Check the result of bcrypt comparison

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If password is correct, generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            // Optional: { expiresIn: '1h' } to make the token expire after 1 hour
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
