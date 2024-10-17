const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login User");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

module.exports = { registerUser, loginUser, logoutUser };
