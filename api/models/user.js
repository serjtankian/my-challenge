const Sequelize = require("sequelize");
const db = require("../db");

class User extends Sequelize.Model {}

User.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;
