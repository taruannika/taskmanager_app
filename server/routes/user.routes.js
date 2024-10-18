const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/user.controller");
const protect = require("../utils/protect");

router.get("/profile", protect, getUserProfile);

module.exports = router;
