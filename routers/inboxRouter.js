// external imports
const express = require("express");

// internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// login
router.get("/", decorateHtmlResponse("Unnamed"), getInbox);

module.exports = router;
