// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

// login
router.get("/", decorateHtmlResponse("User"), getUsers);

router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
