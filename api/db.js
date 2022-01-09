require("dotenv").config();
const sequelize = require("sequelize");
const db = new sequelize(process.env.DB, null, null, {
  local: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
