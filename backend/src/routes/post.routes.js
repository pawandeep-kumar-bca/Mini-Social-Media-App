const express = require('express')
const userLoggedIn = require('../middlewares/auth.middleware')
const postControllers = require('../controllers/post.controller')

const router = express.Router()

// Create Post (protected)
router.post('/', userLoggedIn, postControllers.createPost)

// Get Posts (public)
router.get('/', postControllers.getPosts)

// Like / Unlike (protected)
router.put('/:id/like', userLoggedIn, postControllers.toggleLike)

// Add Comment (protected)
router.post('/:id/comments', userLoggedIn, postControllers.addComment)

module.exports = router