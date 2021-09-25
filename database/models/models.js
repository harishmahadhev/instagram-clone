const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

// Model for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resettoken: String,
    expiretoken: Date,
    active: { type: Boolean, required: true, default: false },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    pic: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
})

// Model for post
const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    likes: [{ type: ObjectId, ref: "User", unique: true }],
    comments: [{ text: String, postedby: { type: ObjectId, ref: "User" } }],
    postedby: {
        type: ObjectId,
        ref: "User"
    }
})


module.exports = {
    userModel: mongoose.model('User', userSchema),
    postModel: mongoose.model("Post", postSchema)
}