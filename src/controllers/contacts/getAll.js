const { Contact } = require("../../models/contactShema");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page, limit, favorite } = req.query;
    const skip = (page - 1) * limit;
    let options = { owner: _id };

    if (favorite) {
      options = { $and: [{ owner: _id }, { favorite: { $eq: true } }] };
    }

    const data = await Contact.find(options, "", { skip: skip, limit: Number(limit) }).populate("owner", "_id email");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
