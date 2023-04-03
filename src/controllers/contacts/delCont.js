const { Contact } = require("../../models/contactShema");

const delCont = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const delContact = await Contact.findByIdAndDelete(contactId);

    if (!delContact) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json(delContact);
  } catch (error) {
    next(error);
  }
};

module.exports = delCont;
