const { User } = require("../../models/userShema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { JWT_SECRET } = process.env;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passwCompare) {
      throw createError(401, `Email or password is wrong`);
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
