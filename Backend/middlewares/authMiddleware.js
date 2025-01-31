const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Fixed the typo here (corrected env variable access)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;
