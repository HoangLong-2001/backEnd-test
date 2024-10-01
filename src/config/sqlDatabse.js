const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize("database", "username", "password", {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT || 3307,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },

  storage: "path/to/database.sqlite", // Chỉ dùng khi MS là SQLite
});
module.exports = sequelize