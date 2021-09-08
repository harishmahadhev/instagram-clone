const express = require('express');
const validateToken = require('./middleware/auth');

const postRouter = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const loginRouter = require('./routes/userRoutes');

app.use(express.json());

// MongoDb connection
require('./database/dbConnection')

// Application Routes
app.use("/login", loginRouter) //Login Route
app.use("/post", validateToken, postRouter) //Post route


// Server Connection
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))