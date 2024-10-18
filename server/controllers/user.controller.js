const asyncHandler = require("express-async-handler");

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // get user from protect middleware
  const user = req.user;
  if (user) {
    // update user
    const { name } = req.body;
    user.name = name || user.name;

    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } else {
    return res.status(404).json({ message: "no user" });
  }
});

module.exports = { getUserProfile, updateUserProfile };
