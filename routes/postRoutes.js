const express = require('express');
const { postModel, userModel } = require('../database/models/models');
const postRouter = express.Router();
const userRouter = express.Router();


// Getting all the posts
postRouter.route("/all")
    .get(async (req, res) => {
        const posts = await postModel.find().populate("postedby", "_id name pic").populate("comments.postedby", "_id name").sort({ _id: -1 })
        res.status(200).send(posts)
    })

// Getting & Deleting single post by sending Id
postRouter.route("/follow")
    .get(async (req, res) => {
        const result = await postModel.find({ postedby: { $in: req.user.following } }).populate("postedby", "_id name pic").populate("comments.postedby", "_id name")
        if (!result) return res.status(404).json({ message: "Post not found " })
        res.status(200).send(result)
    })
postRouter.route("/one")
    .put(async (req, res) => {
        const { id } = req.body
        const result = await postModel.findById(id)
        if (!result) return res.status(404).json({ message: "Not found" })
        if (result.postedby.toString() === req.user._id.toString()) {
            await postModel.deleteOne({ _id: id })
            return res.status(200).json({ message: "Deleted Successfully" })
        } else {
            return res.status(406).json({ message: "You are not allowed to delete" })
        }
    })

// Getting the post created by the user
postRouter.route("/mypost")
    .get(async (req, res) => {
        try {
            const post = await postModel.find({ postedby: req.user._id }).populate("postedby", "_id name pic")
            res.json({ post })
        } catch (error) {
            res.json({ error })
        }
    })

// Creating the post
postRouter.route("/create")
    .post(async (req, res) => {
        const { body, image, location } = req.body
        try {
            if (!body || !image) return res.status(404).json({ error: "Please add all the fields" })
            const post = new postModel({ body, photo: image, postedby: req.user, location })
            await post.save()
            res.status(200).json({ message: "Posted successfully", post })
        }
        catch (error) {
            res.status(404).json({ error })
        }
    })

// liking the post
postRouter.route("/like")
    .put(async (req, res) => {
        const { id } = req.body
        try {
            const result = await postModel.findByIdAndUpdate(id, { $push: { likes: req.user._id } }, { new: true })
            res.status(200).json({ message: result })
        } catch (error) {
            res.status(422).json({ error })
        }

    })

// unliking the post
postRouter.route("/unlike")
    .put(async (req, res) => {
        const { id } = req.body
        try {
            const result = await postModel.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
            res.status(200).json({ message: result })
        } catch (error) {
            res.status(422).json({ error })
        }

    })

// Comment the post
postRouter.route("/comment")
    .put(async (req, res) => {
        const comment = { text: req.body.text, postedby: req.user._id }
        try {
            const result = await postModel.findByIdAndUpdate(req.body.id, { $push: { comments: comment } }, { new: true }).populate("comments.postedby", "_id name")
            res.status(200).json({ message: result })
        } catch (error) {
            res.status(422).json({ error })
        }

    })


userRouter.route("/profile")
    // Getting Profile information
    .get(async (req, res) => {
        const profile = await userModel.findOne({ _id: req.user._id }).select("-password")
        res.status(200).json({ profile })
    })

    // Changing Profile name and Picture
    .patch(async (req, res) => {
        const { name, image } = req.body;
        try {
            const result = await userModel.updateOne({ _id: req.user._id }, { $set: { name: name, pic: image } })
            res.status(200).json({ message: "Updated successfully", result })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error })
        }

    })

userRouter.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password")
        if (!user) return res.status(404).json({ error: "User not found" })
        const posts = await postModel.find({ postedby: id }).populate("postedby", "_id name")
        return res.status(200).json({ user, posts })
    }
    catch (error) {
        console.log(error)
        res.status(404).json({ error })
    }

})

userRouter.route("/follow")
    .put(async (req, res) => {
        try {
            const { id } = req.body
            const result = await userModel.findByIdAndUpdate(id, { $push: { followers: req.user._id } }, { new: true })
            await userModel.findByIdAndUpdate(req.user._id, { $push: { following: id } }, { new: true })
            return res.status(200).json({ message: "Followed", result })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error })
        }
    })

userRouter.route("/unfollow")
    .put(async (req, res) => {
        try {
            const { id } = req.body
            const result = await userModel.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }, { new: true })
            await userModel.findByIdAndUpdate(req.user._id, { $pull: { following: id } }, { new: true })
            return res.status(200).json({ message: "Unfollowed", result })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error })
        }
    })
module.exports = { postRouter, userRouter };