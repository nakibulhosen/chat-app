// external imports
const express = require("express");

// internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();
const pageTitle = "Inbox";

// login
router.get("/", decorateHtmlResponse(pageTitle), getInbox);

module.exports = router;
