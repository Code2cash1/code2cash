const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if admin still exists
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Token is valid but admin no longer exists.'
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired.'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Server error in authentication.'
            });
        }
    }
};

module.exports = { protectAdmin };
