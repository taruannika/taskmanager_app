const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./db/connect");
const { CORS_OPTIONS } = require("./utils/config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./utils/errorhandler");
const app = express();

// connect to DB
connect();

// middlewares
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // protected routes

// error handler
app.use(errorHandler);

module.exports = app;
