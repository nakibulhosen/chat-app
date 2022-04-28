// external modules
const bcrypt = require("bcrypt");

// internal modules
const User = require("../models/peoples");

// get user page
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
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
    console.log("There are files", req.files[0]);
    console.log({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    console.log("there are not files ", req.files);
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

module.exports = { getUsers, addUser };
