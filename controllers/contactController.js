const { constants } = require("../constants");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  if (!constants) {
    return next({
      statusCode: constants.SERVER_ERROR,
      message: "Internal Server Error!"
    })
  }
  res.status(constants.SUCCESS).json(contacts);
};

//@desc Create new contacts
//@route POST /api/contacts
//@access public
const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone
  });

  res.status(constants.CREATED).json(contact);
};

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next({
      statusCode: constants.NOT_FOUND,
      message: "Contact Not found"
    })
  }

  res.status(constants.SUCCESS).json(contact);
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next({
      statusCode: constants.NOT_FOUND,
      message: "Contact Not Found!"
    })
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(constants.SUCCESS).json(updatedContact);
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next({
      statusCode: constants.NOT_FOUND,
      message: "Contact Not Found!"
    })
  }

  await contact.deleteOne({ _id: req.params.id });

  res.status(constants.SUCCESS).json({ message: "Contact deleted successfully" });
};


module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};