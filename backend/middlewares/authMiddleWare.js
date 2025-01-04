const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleWare = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Auth middleware error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = authMiddleWare;