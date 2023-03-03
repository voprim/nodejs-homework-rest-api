const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    return res.status(404).json({
      status: "Error",
      code: 404,
      data: "Not Found",
      message: `${contactId} isn't valid, try again`,
    });
  }

  next();
};

module.exports = isValidId;
