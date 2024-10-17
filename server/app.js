const express = require("express");
const connect = require("./db/connect");
const app = express();

// connect to DB
connect();

module.exports = app;
