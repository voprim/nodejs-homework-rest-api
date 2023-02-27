const Contact = require("../db/contactSchema");

const listContacts = async (owner, page = 1, limit = 100, favorite) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  if (favorite) {
    const res = await Contact.find({ $and: [{ owner }, { favorite }] })
      .skip(skip)
      .limit(limit);
    return res;
  }
  const res = await Contact.find({ owner }).skip(skip).limit(limit);
  return res;
};

const getById = async (contactId, owner) => {
  const result = await Contact.find({ $and: [{ owner }, { _id: contactId }] });
  return result;
};

const addContact = async ({ name, email, phone }, owner) => {
  const result = await Contact.create({ name, email, phone, owner });
  await result.save();
  return result;
};

const removeContact = async (contactId, owner) => {
  const result = await Contact.findByIdAndRemove({
    $and: [{ owner }, { _id: contactId }],
  });
  return result;
};

const updateContact = async (contactId, { name, phone, email }, owner) => {
  const result = await Contact.findByIdAndUpdate(
    { $and: [{ owner }, { _id: contactId }] },
    {
      $set: { name, phone, email },
    },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
