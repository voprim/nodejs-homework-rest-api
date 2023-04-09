const { User } = require("../../models/userShema");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { PORT = 3000 } = process.env;

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log(avatarsDir);

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    await (
      await jimp.read(tempUpload)
    )
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = `http://localhost:${PORT}/avatars/${originalname}`;
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({
      avatarURL: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
