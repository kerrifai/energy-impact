const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/energy_impact"
};

module.exports = config;
