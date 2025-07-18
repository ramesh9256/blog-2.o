const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    let token;

    // 1. Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // 2. If not found, try from cookies
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // 3. If still not found, return Unauthorized
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// generate token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { jwtAuthMiddleware, generateToken };
