const asyncHandler = require("express-async-handler");
const bycrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("All fields are mandatory!");
    }

    const userAvaliable = await User.findOne({ email });
    if (userAvaliable) {
      throw new Error("User already registered!");
    }

    // Hash Password 
    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    if (user) {
      res.status(201).json({
        message: `User Registered Sucessfully! with username: ${user.username} and email: ${user.email}`
      });
    } else {
      throw new Error("User Data is not Valid!");
    }

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

//@desc Current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current User Information" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}