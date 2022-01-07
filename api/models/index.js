const Operation = require("./operation");
const Categories = require("./categories");
const User = require("./user");

// en cada categoria hay muchas operaciones
Categories.hasMany(Operation);
//cada operacion pertenece a una categoria
Operation.belongsTo(Categories);

module.exports = { Operation, Categories, User };
