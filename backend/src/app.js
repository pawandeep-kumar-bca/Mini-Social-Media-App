const express = require('express')


const app = express()

app.use(express.json())

const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
app.use('api/v1/auth',authRouter)
app.use('api/v1/posts',postRouter)
module.exports = app