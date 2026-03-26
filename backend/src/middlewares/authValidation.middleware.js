const { body, validationResult } = require("express-validator");

//  COMMON ERROR HANDLER
const responseWithErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};

//  SIGNUP VALIDATION
const signupUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .toLowerCase(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Must contain special character"),

  responseWithErrors,
];

//  LOGIN VALIDATION
const loginUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  responseWithErrors,
];

module.exports = {
  signupUserValidation,
  loginUserValidation
};