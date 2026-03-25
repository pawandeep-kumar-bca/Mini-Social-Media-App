const express = require('express')


const router = express.Router()

const authControllers = require('../controllers/auth.controller')
const authValidation = require('../middlewares/authValidation.middleware')
router.post('/signup',authValidation.signupUserValidation,authControllers.signupUser)
router.post('/login',authValidation.loginUserValidation,authControllers.loginUser)
module.exports = router