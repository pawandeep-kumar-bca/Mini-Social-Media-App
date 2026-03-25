const express = require('express')
const userLoggedIn = require('../middlewares/auth.middleware')
const postControllers = require('../controllers/post.controller')
const router = express.Router()

// POST /api/posts

router.post('/',userLoggedIn,postControllers.createPost)

// GET /api/posts
router.get('/',userLoggedIn,postControllers.getPosts)

// PUT /api/posts/:id/like
router.put('/:id/like',userLoggedIn,postControllers.toggleLike)

// POST /api/posts/:id/comment
router.post('/:id/comment',userLoggedIn,postControllers.addComment)
module.exports = router