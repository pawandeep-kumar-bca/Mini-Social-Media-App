const express = require('express')


const app = express()

app.use(express.json())

const authRouter = require('./routes/auth.routes')

app.use('api/v1/auth',authRouter)
module.exports = app