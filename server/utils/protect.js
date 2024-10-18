const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // get token from headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // token not found, user is not logged in
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  // get user and set it to request
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

module.exports = protect;
