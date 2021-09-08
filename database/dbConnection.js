const mongoose = require("mongoose")
const { mongoURI } = require('../config/keys')
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => { if (err) console.log(err) })
mongoose.connection.on('open', () => console.log("Mongodb connected"))