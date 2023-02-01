const express = require("express");
const router = express.Router();

const { listContacts, getById, addContact, removeContact, updateContact } = require("../../models/contacts.js");
const { bodySchema } = require("../../models/validateContacts");

const RequestError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getById(contactId);
    if (!contactById) {
      throw RequestError(404, "Not found");
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = bodySchema.validate(req.body);
    const body = req.body;

    if (validationResult.error) {
      throw RequestError(400, "missing required name field");
    }

    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const validationResult = bodySchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await updateContact(contactId, body);
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
