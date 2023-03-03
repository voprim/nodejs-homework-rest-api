const Contact = require("../db/contactSchema");

const listContacts = async ({ id, skip, limit, favorite }) => {
  try {
    if (skip || limit) {
      const data = await Contact.find({ owner: id }, "", { skip, limit: Number(limit) }).populate(
        "owner",
        "_id username email"
      );
      return data;
    }

    if (favorite) {
      const data = await Contact.find({ favorite: favorite }).populate("owner", "_id username email");
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (contactId) => {
  try {
    const data = await Contact.findById(contactId).populate("owner", "email subscription");

    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// const addContact = async ({ id, body }) => {
//   try {
//     const data = await Contact.create({ ...body, owner: id });
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ name, email, phone, owner, favorite });
  await contact.save();
  return contact;
};

const removeContact = async (contactId) => {
  try {
    const data = await Contact.findByIdAndRemove(contactId);

    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });

    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
