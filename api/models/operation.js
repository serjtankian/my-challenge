const sequelize = require("sequelize");
const db = require("../db");

class Operation extends sequelize.Model {}

Operation.init(
  {
    concept: {
      type: sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: sequelize.INTEGER,
      allowNull: false,
    },

    type: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "operation" }
);

module.exports = Operation;
