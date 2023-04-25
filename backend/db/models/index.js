"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const initUser = require("./user");
const initDocument = require("./document");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/database.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
db.User = initUser(sequelize);
db.Document = initDocument(sequelize);
db.User.hasMany(db.Document, {
  foreignKey: "created_by", // The foreign key in the Document model
  onDelete: "CASCADE",
  as: "documents",
});

db.Document.belongsTo(db.User, {
  foreignKey: "created_by",
  as: "creator",
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
