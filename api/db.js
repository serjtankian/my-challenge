const sequelize = require("sequelize");
const db = new sequelize("abm", null, null, {
  local: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
