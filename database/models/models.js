const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

// Model for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resettoken: String,
    expiretoken: Date,
})

// Model for post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    },
    postedby: {
        type: ObjectId,
        ref: "User"
    }
})


module.exports = {
    userModel: mongoose.model('User', userSchema),
    postModel: mongoose.model("Post", postSchema)
}