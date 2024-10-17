const mongoose = require("mongoose");
const { MONGO_URI } = require("../utils/config");
const { info, error } = require("../utils/logger");
const connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      info("Connected to Mongo DB");
    })
    .catch((err) => {
      error("failed to connect Mongo DB", err);
    });
};

module.exports = connect;
