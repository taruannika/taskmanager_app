const { error } = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
  console.log(err.name, err.code);

  switch (err.name) {
    case "ValidationError":
      const messages = Object.values(err.errors).map(
        (messages) => messages.message
      );
      return res.status(400).json({ message: messages });
    case "MongoServerError":
      if (err.code === 11000) {
        return res.status(400).json({ message: "User already exist" });
      } else {
        error("MongoServerError", err);
      }

    default:
      return res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;
