const { User } = require("../../models/userShema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, `Email in use`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const addUser = await User.create({ email, password: hashPassword });
    res.status(201).json({
      user: {
        email: addUser.email,
        subscription: addUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
