const { User } = require("../../models/userShema");
const createError = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendingEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user.verify) {
      throw createError(400, `Verification has already been passed`);
    }

    const verificationToken = user.verificationToken;

    const mail = {
      to: email,
      subject: "Confirm email",
      text: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendingEmail;
