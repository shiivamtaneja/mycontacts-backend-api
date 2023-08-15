const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    typeof: String,
    required: [true, "Please add the contact Name"]
  },
  email: {
    typeof: String,
    required: [true, "Please add the contact Email Address"]
  },
  phone: {
    typeof: String,
    required: [true, "Please add the contact Phone Number"]
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);