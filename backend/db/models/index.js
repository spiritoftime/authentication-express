"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const initUser = require("./user");
const initDocument = require("./document");
const initFolder = require("./folder");
const initUserFolderAccess = require("./user_folder_access");
const initUserDocumentAccess = require("./user_document_access");
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
db.UserDocumentAccess = initUserDocumentAccess(sequelize);
db.Folder = initFolder(sequelize);
db.UserFolderAccess = initUserFolderAccess(sequelize);
db.User.hasMany(db.Document, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
  as: "createdDocuments",
});

db.Document.belongsTo(db.User, {
  foreignKey: "createdBy", // the belongs to key
  as: "creator",
});
db.User.belongsToMany(db.Document, {
  foreignKey: "userId",
  as: "accessibleDocuments",
  through: db.UserDocumentAccess,
});
db.Document.belongsToMany(db.User, {
  foreignKey: "documentId",
  as: "accessibleTo",
  through: db.UserDocumentAccess,
});
db.Folder.belongsToMany(db.User, {
  foreignKey: "folderId",
  as: "foldersAccessibleTo",
  through: db.UserFolderAccess,
});
db.User.belongsToMany(db.Folder, {
  foreignKey: "userId",
  through: db.UserFolderAccess,
  as: "accessibleFolders",
});
db.Folder.belongsTo(db.Folder, {
  foreignKey: "parentFolderId",
  as: "parentFolder",
});

db.Folder.hasOne(db.Folder, {
  foreignKey: "parentFolderId",
  as: "childFolder",
});
db.Document.belongsTo(db.Folder, {
  foreignKey: "folderId",
  as: "folder",
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
