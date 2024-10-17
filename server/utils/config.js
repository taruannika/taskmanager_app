require("dotenv").config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const CORS_OPTIONS = {
  origin: CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

module.exports = { PORT, MONGO_URI, CLIENT_URL, JWT_SECRET, CORS_OPTIONS };
