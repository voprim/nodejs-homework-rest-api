const { Contact } = require("../../models/contactShema");

const updateFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!updatedContact) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
