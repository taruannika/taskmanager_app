const asyncHandler = require("express-async-handler");

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = { getUserProfile };
