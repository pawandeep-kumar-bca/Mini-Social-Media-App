const express = require('express')
const userLoggedIn = require('../middlewares/auth.middleware')
const postControllers = require('../controllers/post.controller')
const router = express.Router()

// POST /api/posts

router.post('/',userLoggedIn,postControllers.createPost)

// GET /api/posts
router.get('/',userLoggedIn,postControllers.createPost)


module.exports = router