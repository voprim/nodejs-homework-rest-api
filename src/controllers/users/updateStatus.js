const { User } = require("../../models/userShema");

const updateStatus = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.status(200).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
