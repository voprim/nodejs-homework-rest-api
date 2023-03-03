require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const User = require("../models/userModel");
const UserSchema = require("../db/userSchema");

const registrationController = async (req, res, next) => {
  try {
    const { email } = req.body;
    // const user = await User.findByEmail(email);
    const user = await UserSchema.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        data: "Conflict",
        message: "User with this email is already exist",
      });
    }

    const create = async function ({ name, email, password, subscription }) {
      const userCreate = new UserSchema({ name, email, password, subscription });
      return await userCreate.save();
    };

    const newUser = await create(req.body);
    return res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // const user = User.findByEmail(email);
    const user = await UserSchema.findOne({ email });

    const isValidPassword = await bcrypt.compare(password, user.password); // await user.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(401).json({
        status: "Error",
        code: 401,
        data: "Unauthorized",
        message: "Email or password is wrong",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    // await User.updateToken(id, token);
    await UserSchema.findByIdAndUpdate(user._id, { token });
    // await User.updateOne( id , { token });

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        token,
      },
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  // const userId = req.user.id;
  // await User.updateToken(userId, null);
  try {
    const { _id: id } = req.user;
    const user = await UserSchema.findById(id);
    if (!user) {
      return res.status(401).json({
        status: "Error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }

    await UserSchema.findByIdAndUpdate(id, { token: "" });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const currentUserController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: "Error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registrationController, loginController, logoutController, currentUserController };
