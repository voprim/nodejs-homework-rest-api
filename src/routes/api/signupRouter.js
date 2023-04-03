const express = require("express");
const router = express.Router();

const validation = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");
const { regJoiSchema, loginJoiSchema } = require("../../models/userShema");
const { signup: ctrls } = require("../../controllers");

router.post("/signup", validation(regJoiSchema), ctrls.register);
router.post("/login", validation(loginJoiSchema), ctrls.login);
router.get("/logout", authenticate, ctrls.logout);

module.exports = router;
