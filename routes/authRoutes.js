const express = require('express');
const authRouter = express.Router();

authRouter.route("/").get(async (req, res) => {
    res.send("hello")
})
module.exports = authRouter;