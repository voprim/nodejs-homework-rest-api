const express = require("express");
const router = express.Router();

const validation = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");
const { contactSchemaJoi, favoriteSchemaJoi } = require("../../models/contactShema");
const { contacts: ctrls } = require("../../controllers");

router.get("/", authenticate, ctrls.getAll);
router.get("/:contactId", authenticate, ctrls.getById);
router.post("/", authenticate, validation(contactSchemaJoi), ctrls.addCont);
router.delete("/:contactId", authenticate, ctrls.delCont);
router.put("/:contactId", authenticate, validation(contactSchemaJoi), ctrls.updateCont);
router.patch("/:contactId/favorite", authenticate, validation(favoriteSchemaJoi), ctrls.updateFavorite);

module.exports = router;
