const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

const { validator } = require("../middleware/validator");

console.log(validator);

const router = express.Router();

router.post("/register", validator('body', ['email', 'username', 'password']), registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

module.exports = router;