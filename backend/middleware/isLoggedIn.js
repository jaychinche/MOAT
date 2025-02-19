const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isLoggedIn = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-auth-token'];
    

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ error: 'No token provided, user not logged in' });
    }

    try {
        // Verify the token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user info to the request object
        req.user = decoded;

        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token, user not logged in' });
    }
};

module.exports = isLoggedIn;
