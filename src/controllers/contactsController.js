const Contacts = require("../models/contactModel");
const { bodySchemaCreate, bodySchemaUpdate } = require("../models/validateContacts");

const listContacts = async (req, res) => {
  const { _id: id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contacts.listContacts({ id, skip, limit, favorite });
  return res.json({
    status: "Success",
    code: 200,
    message: "Contacts found",
    data: {
      contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const contact = await Contacts.getContactById(req.params.contactId);
  if (contact) {
    return res.json({
      status: "Success",
      code: 200,
      message: "Contact found",
      data: {
        contact,
      },
    });
  } else {
    return res.status(404).json({
      status: "Error",
      code: 404,
      message: "Not found",
    });
  }
};

const addContact = async (req, res) => {
  // const contact = await Contacts.addContact(req.body);
  const { _id: id } = req.user;
  const contact = await Contacts.addContact({ ...req.body, id });
  if (contact) {
    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "New contact has been added",
      data: {
        contact,
      },
    });
  }
  const { error } = bodySchemaCreate.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "Error",
      code: 400,
      message: "Missing required name field",
    });
  }
};

const removeContact = async (req, res) => {
  const contact = await Contacts.removeContact(req.params.contactId);

  if (contact) {
    return res.json({
      status: "Success",
      code: 200,
      message: "Contact has been deleted",
      data: {
        contact,
      },
    });
  } else {
    return res.status(400).json({
      status: "Error",
      code: 404,
      message: "Not found",
    });
  }
};

const updateContact = async (req, res) => {
  const contact = await Contacts.updateContact(req.params.contactId, req.body);

  const { error } = bodySchemaUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "Error",
      code: 400,
      message: "Missing required name field",
    });
  }

  if (contact) {
    return res.json({
      status: "Success",
      code: 200,
      message: "Contact has been updated",
      data: {
        contact,
      },
    });
  } else {
    return res.status(404).json({
      status: "Error",
      code: 404,
      message: "Not found",
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
