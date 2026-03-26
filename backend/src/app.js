const express = require('express')
const cookieParser = require("cookie-parser");

const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json())
app.use(cookieParser());
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/posts',postRouter)
module.exports = app