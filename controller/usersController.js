// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/peoples");

// get user page
async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save the user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: "Unknown error occured",
          error: error,
        },
      },
    });
  }
}

// Remove user
async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`),
        (err) => {
          if (err) {
            console.log("Unlink error", err);
          }
        }
      );
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: "Could not delete user",
          error: error,
        },
      },
    });
  }
}

module.exports = { getUsers, addUser, removeUser };
