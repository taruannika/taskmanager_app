const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const protect = require("../utils/protect");

router.get("/profile", protect, getUserProfile);
router.patch("/update", protect, updateUserProfile);

module.exports = router;
