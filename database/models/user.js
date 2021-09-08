const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resettoken: String,
    expiretoken: Date,
})
module.exports = {
    userModel: mongoose.model('User', userSchema)
}