const express = require("express");
const router = express.Router();

const { inputValidator } = require("../middleware/inputValidator");

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

router.route('/').get(getContacts).post(inputValidator('body', ['name', 'email', 'phone']), createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;