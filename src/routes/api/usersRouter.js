const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/authenticate");
const { users: ctrls } = require("../../controllers");
const upload = require("../../middlewares/upload");
const validation = require("../../middlewares/validation");
const { resendingSchemaJoi } = require("../../models/userShema");

router.get("/current", authenticate, ctrls.getCurrent);

router.get("/verify/:verificationToken", ctrls.verifyEmail);

router.post("/verify", validation(resendingSchemaJoi), ctrls.resendingEmail);

router.patch("/", authenticate, ctrls.updateStatus);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrls.updateAvatar);

module.exports = router;
