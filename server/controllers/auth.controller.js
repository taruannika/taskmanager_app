const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const { COOKIE_OPTIONS } = require("../utils/config");

const registerUser = asyncHandler(async (req, res) => {
  // Validation errors are handled by the user model and passed to the error handler
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  // generating token for user
  const token = generateToken(user.id);

  if (user) {
    //succesfully created user,  sending user info and token to client
    const savedUser = { id: user.id, name, email, token };
    res.cookie("token", token, COOKIE_OPTIONS).status(201).json(savedUser);
  } else {
    // failed to create user
    res.status(400).json({ message: "Error creating user" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login User");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

module.exports = { registerUser, loginUser, logoutUser };
