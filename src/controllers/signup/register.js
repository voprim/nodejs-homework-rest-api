const { User } = require("../../models/userShema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, `Email in use`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const addUser = await User.create({ email, password: hashPassword, verificationToken, avatarURL });

    const mail = {
      to: email,
      subject: "Confirm email",
      text: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      user: {
        email: addUser.email,
        subscription: addUser.subscription,
        avatar: addUser.avatarURL,
        verificationToken: addUser.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
