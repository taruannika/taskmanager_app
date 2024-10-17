const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const generateToken = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
  return token;
};

module.exports = generateToken;
