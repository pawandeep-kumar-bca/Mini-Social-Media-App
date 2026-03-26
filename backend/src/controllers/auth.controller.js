const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  SIGNUP
async function signupUser(req, res) {
  try {
    let { username, email, password } = req.body;

    email = email.toLowerCase();

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword
    });
   
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json({
      message: "User signup successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        
        email: user.email
      }
    });

  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

//  LOGIN
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      token, // optional (frontend friendly)
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = {
  signupUser,
  loginUser
};