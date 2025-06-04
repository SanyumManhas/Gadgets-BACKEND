const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456789Sanyum1';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized User" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: "Forbidden" });
    }
};

module.exports = verifyToken;
