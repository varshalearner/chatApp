const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); 
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { // Corrected 'header' to 'headers'
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) { 
            return res.status(401).json({ message: "Unauthorized" });
        }
    }

    if (!token) {
        // If token is not provided, send a 401 Unauthorized response
        return res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = {protect};
