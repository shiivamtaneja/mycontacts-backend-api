const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the User Name"]
    },
    email: {
      type: String,
      required: [true, "Please add the User Email Address"],
      unique: [true, "Email Address already used"]
    },
    password: {
      type: String,
      required: [true, "Please add the user Password"]
    }
  },
  {
    timestamp: true,
  }
)

module.exports = mongoose.model("User", userSchema);