const express = require('express')
const userLoggedIn = require('../middlewares/auth.middleware')
const postControllers = require('../controllers/post.controller')
const router = express.Router()

// POST /api/posts

router.post('/',userLoggedIn,postControllers.createPost)

// GET /api/posts
router.get('/',postControllers.getPosts)

// PUT /api/posts/:id/like
router.put('/:id/like',userLoggedIn,postControllers.toggleLike)

// POST /api/posts/:id/comments
router.post('/:id/comments',userLoggedIn,postControllers.addComment)
module.exports = router