const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cookieParser = require('cookie-parser');



const signIn = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (userType !== user.userType) {
            return res.status(403).json({ error: "Incorrect user type selected" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userid: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie('token', token, { httpOnly: true, secure: false });
    
       console.log(userType)
        // Send token in response
        res.status(200).json({ message: "Login successful", token, userType: user.userType });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { signIn };
