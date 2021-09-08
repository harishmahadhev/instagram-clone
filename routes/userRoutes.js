const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys')
const { userModel } = require('../database/models/models');
const { signupValidation, signinValidation } = require('../shared/validation');

// User Signup Route

loginRouter.route("/signup")
    .get(async (req, res) => {
        const result = await userModel.find({})
        res.status(200).send(result);
    })
    .post(async (req, res) => {
        let { name, email, password, } = req.body
        try {
            if (!email || !password || !name) return res.status(404).json({ message: "Please add all the fields" })
            //    Validating Inputs
            const { error } = await signupValidation(req.body);
            if (error) return res.status(401).json({ message: error })

            // Checking the user email
            const isExist = await userModel.findOne({ email })
            if (isExist) return res.status(404).json({ message: "User Already Exist please Sign in" });

            // Encrypting the user Password
            const salt = await bcrypt.genSalt(12);
            console.log(salt)
            password = await bcrypt.hash(req.body.password, salt);

            // Saving the document into database
            const result = new userModel({ name, email, password });
            await result.save()

            // Sending response to the user
            res.status(200).json({ message: "Account created successfully" })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }

    })

// User Signin Route

loginRouter.route("/signin")
    .post(async (req, res) => {
        let { email, password } = req.body;
        try {
            if (!email || !password) return res.status(404).json({ message: "Please add all the fields" })

            //    Validating Inputs
            const { error } = signinValidation(req.body);
            if (error) return res.status(401).json({ message: error })

            // Checking the user email
            const isExist = await userModel.findOne({ email })
            if (!isExist) return res.status(404).json({ message: "User does'nt Exists" });

            // Checking the user Password
            const isPasswordCorrect = await bcrypt.compare(password, isExist.password);
            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

            // Creating Jwt Token
            const token = jwt.sign({ _id: isExist._id, email: isExist.email }, jwtSecret)

            // Sending response to the user
            res.status(200).json({ message: "Login successfully", token })

        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    })

loginRouter.route("/signup/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const result = await userModel.findById(id)
        if (!result) return res.status(404).json({ message: "not exist" })
        res.status(200).json({ result })
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        const result = await userModel.findByIdAndRemove(id)
        res.status(200).json({ message: "deleted successfully", result })
    })


module.exports = loginRouter;