const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/keys');
const { userModel } = require('../database/models/models');

const validateToken = async (req, res, next) => {
    try {
        // Getting token from the Bearer Header
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Access denied" })

        // Verifing the token 
        const decoded = jwt.verify(token, jwtSecret)
        const user = await userModel.findOne({ _id: decoded._id })

        // Getting the current user
        req.user = user;
        req.user.password = undefined
        next();

    } catch (err) {
        res.status(404).json({ message: "invalid token" })
    }
}

module.exports = validateToken