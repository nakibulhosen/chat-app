// external imports
const express = require("express");

// internal imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  loginValidators,
  loginValidatorHandler,
} = require("../middlewares/login/loginValidator");

const router = express.Router();

const pageTitle = "Login";
// login
router.get("/", decorateHtmlResponse(pageTitle), getLogin);
router.post(
  "/",
  decorateHtmlResponse(pageTitle),
  loginValidators,
  loginValidatorHandler,
  login
);

module.exports = router;
