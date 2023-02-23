const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/authenticate");

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
} = require("../../controllers/usersController");

router.post("/signup", registrationController);
router.post("/login", loginController);
router.get("/logout", authenticate, logoutController);
router.get("/current", authenticate, currentUserController);

module.exports = router;
