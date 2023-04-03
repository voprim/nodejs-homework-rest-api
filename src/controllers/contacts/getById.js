const { Contact } = require("../../models/contactShema");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      throw createError(404, `contact with id=${contactId} not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
