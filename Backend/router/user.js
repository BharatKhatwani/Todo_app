const express = require('express');
const router = express.Router();
const { 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser, 
    getUserById 
} = require('../Controller/userController.js'); // Ensure correct path

// Middleware for Authentication (Protecting User Routes)
const authMiddleware = require('../middlewares/authMiddleware.js'); // Ensure this exists

// User Routes
// router.post('/', authMiddleware, createUser); // Protect user creation if needed
router.get('/', getUser);  // Protect user retrieval
router.get('/:id', getUserById);
router.put('/:id',  updateUser);
router.delete('/:id',  deleteUser);

module.exports = router;
