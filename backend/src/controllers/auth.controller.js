const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

async function signupUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "user already exists" });
    }

    const hashPassword =await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
        message:'user signup successfully',
        username:user.username,
        email:user.email
    })
  } catch (err) {
    console.error("signup user error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
  } catch (err) {
    console.error("signup user error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signupUser,
  loginUser,
};
