const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/authenticate");
const { users: ctrls } = require("../../controllers");
const upload = require("../../middlewares/upload");

router.get("/current", authenticate, ctrls.getCurrent);
router.patch("/", authenticate, ctrls.updateStatus);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrls.updateAvatar);

module.exports = router;
