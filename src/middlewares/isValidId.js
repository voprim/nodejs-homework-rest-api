const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);

  if (!result) {
    return res.status(404).json({
      status: "Error",
      code: 404,
      data: "Not Found",
      message: `${id} isn't valid, try again`,
    });
  }

  next();
};

module.exports = isValidId;
