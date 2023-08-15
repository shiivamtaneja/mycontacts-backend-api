const asyncHandler = require("express-async-handler");
const bycrypt = require("bcrypt");
const User = require("../models/userModel");

const { constants } = require("../constants");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res, next) => {

  const { username, email, password } = req.body;

  const userAvaliable = await User.findOne({ email });
  if (userAvaliable) {
    return next({
      statusCode: constants.FORBIDDEN,
      message: "User Already Registered!",
    });
  }

  try {
    // Hash Password 
    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(constants.CREATED).json({
      message: `User Registered Sucessfully! with username: ${user.username} and email: ${user.email}`
    });

  } catch (err) {
    console.log(err);
    return next({
      statusCode: constants.SERVER_ERROR,
      message: "Something went wrong!"
    })
  }
};

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