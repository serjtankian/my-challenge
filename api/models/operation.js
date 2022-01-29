const sequelize = require("sequelize");
const db = require("../db");
var moment = require("moment");

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
    /* createdAt: {
      type: sequelize.DataTypes.DATE,
      //note here this is the guy that you are looking for
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "DD/MM/YYYY h:mm:ss"
        );
      },
    },
    updatedAt: {
      type: sequelize.DataTypes.DATE,
      get() {
        return moment(this.getDataValue("updatedAt")).format(
          "DD/MM/YYYY h:mm:ss"
        );
      },
    }, */
  },
  { sequelize: db, modelName: "operation" }
);

module.exports = Operation;
