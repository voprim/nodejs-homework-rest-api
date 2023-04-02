const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/authenticate");
const { users: ctrls } = require("../../controllers");

router.get("/current", authenticate, ctrls.getCurrent);
router.patch("/", authenticate, ctrls.updateStatus);

module.exports = router;
