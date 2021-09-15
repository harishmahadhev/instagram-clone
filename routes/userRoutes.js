const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys')
const { userModel } = require('../database/models/models');
const { signupValidation, signinValidation } = require('../shared/validation');
const { activateMail } = require('../shared/mailer');

// User Signup Route
loginRouter.route("/signup")
    .get(async (req, res) => {
        const result = await userModel.find({}).select("-password").sort({ _id: -1 })
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
            password = await bcrypt.hash(req.body.password, salt);
            crypto.randomBytes(32, async (err, buffer) => {
                if (err) console.log(err)
                const token = buffer.toString('hex');

                // Saving the document into database
                const result = new userModel({ email, password, name, resettoken: token, expiretoken: Date.now() + 1200000 })
                await result.save()

                // Sending activate link to the Mail
                const mail = await activateMail(email, token);
                if (!mail) return res.status(409).json({ message: "Something went wrong, Make sure you entered valid email" })

                // Sending response to the user
                res.status(200).json({ message: "Please Check the mail to activate the account (including spam folder)" })
            })



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
            // Check if account is active
            if (!isExist.active) {
                if (!isExist.expiretoken || isExist.expiretoken < Date.now())
                    await userModel.findByIdAndRemove(isExist._id)
                return res.status(404).json({ message: "Please Activate your account" })
            }
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

loginRouter.route("/activate")
    .post(async (req, res) => {
        const { token } = req.body
        const user = await userModel.findOne({ resettoken: token, expiretoken: { $gt: Date.now() } })
        if (!user) {
            await userModel.findOneAndRemove({ resettoken: token })
            return res.status(408).json({ message: "Request Timeout Please create your account again" })
        }
        user.active = true;
        user.resettoken = undefined;
        user.expiretoken = undefined;
        user.save();
        res.status(200).json({ message: "Your Account is activated Successfully" })
    })

loginRouter
    .route("/forgot")
    .post(async (req, res) => {
        const { email } = req.body;
        try {
            crypto.randomBytes(32, async (err, buffer) => {
                if (err) console.log(err)
                const token = buffer.toString("hex");
                const isExists = await userModel.findOne({ email });
                if (!isExists) return res.status(404).json({ message: "User doesn't Exists" })
                isExists.resettoken = token;
                isExists.expiretoken = Date.now() + 1200000;
                await isExists.save();
                const mail = await resetMail(email, token);
                if (!mail) return res.status(409).json({ message: "Something went wrong" })
                res.status(200).json({ message: "Please Check the mail to reset your password (check spam folder also)" })
            })
        } catch (error) {
            res.json({ message: error })
        }
    })

loginRouter
    .route("/reset")
    .post(async (req, res) => {
        const { token, password } = req.body;
        try {
            const user = await userModel.findOne({ resettoken: token, expiretoken: { $gt: Date.now() } })
            if (!user) return res.status(408).json({ message: "Request Timeout Please Try again Later" })
            const salt = await bcrypt.genSalt(12);
            const hashedpassword = await bcrypt.hash(password, salt);
            user.password = hashedpassword;
            user.resettoken = undefined;
            user.expiretoken = undefined;
            await user.save()
            res.status(200).json({ message: "Password is updated Successfully" })
        } catch (error) {
            res.json({ message: error })
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