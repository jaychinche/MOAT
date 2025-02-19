const jwt = require('jsonwebtoken');
const User = require('../models/User');


const isAdmin = async (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-auth-token'];    //OR  const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Check if the user is an admin
        if (decoded.userType !== 'admin') {
            return res.status(403).json({ error: "Access denied. You are not an admin" });
        }
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = isAdmin;