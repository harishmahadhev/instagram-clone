const express = require('express');
const validateToken = require('./middleware/auth');
const cors = require('cors')
const loginRouter = require('./routes/userRoutes');
const { postRouter, userRouter } = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// middle ware
app.use(cors())
app.use(express.json());

// MongoDb connection
require('./database/dbConnection')

// Application Routes
app.use("/login", loginRouter) //Login Route
app.use("/user", validateToken, userRouter)
app.use("/post", validateToken, postRouter) //Post route

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// Server Connection
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))