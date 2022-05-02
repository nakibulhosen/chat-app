// internal imports
const User = require("../models/peoples");

// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function getLogin(req, res, next) {
  res.render("index", {
    title: "Login - Chat Application",
  });
}

// do login
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isPasswordValid = bcrypt.compare(req.body.password, user.password);
      if (isPasswordValid) {
        // make user object
        let userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        // generate jwt token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxage: process.env.COOKIE_EXPIRE,
          httpOnly: true,
          signed: true,
        });

        // set logged in user in local identifier
        res.locals.loggedInUser = userObject;

        // render the inbox page
        res.render("inbox");
      } else {
        throw createError("Login failed! Try with acurate credentials");
      }
    } else {
      throw createError("Login failed! Try with acurate credentials");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

module.exports = { getLogin, login };
