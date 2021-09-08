const express = require('express');
const validateToken = require('./middleware/auth');
const authRouter = require('./routes/authRoutes');
const app = express();

const userRouter = require('./routes/userRoutes');
require('./database/dbConnection')
app.use(express.json());
app.use("/", userRouter)
app.use("/protected", validateToken, authRouter);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is running at ${PORT}`))