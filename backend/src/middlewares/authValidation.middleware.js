const { body, validationResult } = require("express-validator");

const ResponseWithErrors = (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const signupUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("user name is required")
    .trim()
    .isLowercase(),
  body("email").isEmail().notEmpty().withMessage("email is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password length is 6 letter")
    .matches(/[A-Z]/)
    .withMessage("Must contain uppercase")
    .matches(/[a-z]/)
    .withMessage("Must contain lowercase")
    .matches(/[0-9]/)
    .withMessage("Must contain number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Must contain special char"),
  ResponseWithErrors,
];

const loginUserValidation = [
  body('email')
  .notEmpty()
  .withMessage('email is required')
  .isEmail(),
  body('password')
  .notEmpty()
  .withMessage('password is required'),
  ResponseWithErrors
]
module.exports = {signupUserValidation,loginUserValidation}