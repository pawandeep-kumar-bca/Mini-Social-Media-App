const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth.controller");
const {
  signupUserValidation,
  loginUserValidation,
} = require("../middlewares/authValidation.middleware");

// ✅ ROUTES
router.post("/signup", signupUserValidation, authControllers.signupUser);
router.post("/login", loginUserValidation, authControllers.loginUser);

module.exports = router;
