const express = require("express");
const cors = require("cors");
const connect = require("./db/connect");
const { CORS_OPTIONS } = require("./utils/config");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./utils/errorhandler");
const app = express();

// connect to DB
connect();

// middlewares
app.use(cors(CORS_OPTIONS));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// error handler
app.use(errorHandler);

module.exports = app;
