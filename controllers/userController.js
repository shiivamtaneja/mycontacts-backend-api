const asyncHandler = require("express-async-handler");
const bycrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Compare password with Hashed Password
  if (user && (await bycrypt.compare(password, user.password))) {

    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      }
    }, process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(constants.SUCCESS).json({ accessToken });
  } else {
    return next({
      statusCode: constants.UNAUTHORIZED,
      message: "Invalid Email or Password!"
    })
  }
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