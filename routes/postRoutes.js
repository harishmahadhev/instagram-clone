const express = require('express');
const { postModel } = require('../database/models/models');
const postRouter = express.Router();

// Getting all the posts
postRouter.route("/all")
    .get(async (req, res) => {
        const posts = await postModel.find().populate("postedby", "_id name")
        res.status(200).send(posts)
    })

// Getting & Deleting single post by sending Id
postRouter.route("/one")
    .get(async (req, res) => {
        const { id } = req.body
        const result = await postModel.findById(id)
        if (!result) return res.status(404).json({ message: "Post not found " })
        res.status(200).send(result)
    })
    .delete(async (req, res) => {
        const { id } = req.body
        await postModel.findByIdAndRemove(id)
        res.status(200).json({ message: "Deleted Successfully" })
    })

// Getting the post created by the user
postRouter.route("/mypost").get(async (req, res) => {
    try {
        const post = await postModel.find({ postedby: req.user._id }).populate("postedby", "_id name")
        res.json({ post })
    } catch (error) {
        res.json({ error })
    }
})

// Creating the post
postRouter.route("/create")
    .post(async (req, res) => {
        const { title, body } = req.body
        try {
            if (!title || !body) return res.status(404).json({ error: "Please add all the fields" })
            const post = new postModel({ title, body, postedby: req.user })
            await post.save()
            res.status(200).json({ message: "Posted successfully", post })
        }
        catch (error) {
            res.status(404).json({ error })
        }
    })



module.exports = postRouter;