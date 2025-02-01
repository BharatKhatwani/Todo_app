const jwt = require('jsonwebtoken');
const User = require('../model/User');  // Ensure the correct path to your User model

async function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("Decoded JWT:", decoded);  // Debugging line

        // Fetch user from DB
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;  // Attach full user object to request
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = verifyToken;
