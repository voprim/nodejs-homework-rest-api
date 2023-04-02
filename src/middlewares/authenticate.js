const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../models/userShema");

const authenticate = async (req, res, next) => {
  try {
    const { JWT_SECRET } = process.env;
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw createError(401, `Not authorized`);
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createError(401, `Not authorized`);
    }

    req.user = user;
    next();
  } catch (error) {
    error.message = `Not authorized`;
    error.status = 401;
    next(error);
  }
};

module.exports = authenticate;
