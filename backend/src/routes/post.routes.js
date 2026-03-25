const express = require('express')
const userLoggedIn = require('../middlewares/auth.middleware')

const router = express.Router()

// POST /api/posts

router.post('/',userLoggedIn)



module.exports = router