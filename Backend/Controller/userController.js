const User = require('../model/User.js');

// Create User
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password
        });
        
        // Save the user
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

// Get All Users
const getUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

// Update User
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        
        // Find user by ID
        const userFind = await User.findById(id);
        if (!userFind) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user details
        userFind.username = username || userFind.username;
        userFind.email = email || userFind.email;
        userFind.password = password || userFind.password;

        // Save updated user
        await userFind.save();

        res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find user by ID
        const userFind = await User.findById(id);
        if (!userFind) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the user
        await userFind.remove();

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = { createUser, getUser, updateUser, deleteUser };
