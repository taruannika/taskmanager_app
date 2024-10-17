const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const { COOKIE_OPTIONS, JWT_SECRET } = require("../utils/config");

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
  const { email, password } = req.body;
  // validating validation errors
  const messages = [];
  if (!email) {
    messages.push("Email is required");
  }
  if (!password) {
    messages.push("Password is required");
  }
  if (messages.length > 0) {
    return res.status(400).json({ message: messages });
  }

  // check that user is in DB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check that password matches with password in DB
  const passwordMatch = await user.checkPassword(password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // generate token
  const token = generateToken(user.id);

  if (user && user.checkPassword) {
    // succesfully logged in
    const userToSend = {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
    res.cookie("token", token, COOKIE_OPTIONS).status(200).json(userToSend);
  } else {
    // failed to log in
    res.status(400).json({ message: "Invalid credentials" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

module.exports = { registerUser, loginUser, logoutUser };
