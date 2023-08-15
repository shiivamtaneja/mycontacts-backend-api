const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

const { inputValidator } = require("../middleware/inputValidator");
const { tokenValidator } = require("../middleware/tokenValidator");

const router = express.Router();

router.post("/register", inputValidator('body', ['email', 'username', 'password']), registerUser);

router.post("/login", inputValidator('body', ['email', 'password']), loginUser);

router.get("/current", tokenValidator, currentUser);

module.exports = router;