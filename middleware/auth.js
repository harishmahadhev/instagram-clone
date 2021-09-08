const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/keys');
const { userModel } = require('../database/models/user');
const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Access denied" })
        const decoded = jwt.verify(token, jwtSecret)
        const user = userModel.findById(decoded._id)
        req.user = user;
        next();
    } catch (err) {
        res.status(404).json({ message: "invalid token" })
    }
}
module.exports = validateToken