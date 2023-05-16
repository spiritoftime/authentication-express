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
if (env === "production" && config.use_env_variable) {
  // If use_env_variable is specified in config, use it to get the connection string
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: "postgres", // Specify the dialect explicitly
  });
} else {
  // Fall back to separate environment variables in development
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: "postgres", // Specify the dialect explicitly
    ...config, // Include other configuration options
  });
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
// one user can have many documents, whilst one document can only be created by one user
db.User.hasMany(db.Document, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
  as: "createdDocuments",
});

db.Document.belongsTo(db.User, {
  foreignKey: "createdBy", // the belongs to key
  as: "creator",
});
// one user can have many documents, and one document can be accessible to many users. ondelete cascade should be in model definition for many-many
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
// one user can have many folders, and one folder can be accessibleto many users.
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
// one folder can have many child folders, but one child folder can only have one parent. onDelete cascade works when the parent is deleted, the child is deleted too
db.Folder.belongsTo(db.Folder, {
  foreignKey: "parent",
  as: "parentFolder",
  onDelete: "CASCADE",
});

db.Folder.hasMany(db.Folder, {
  foreignKey: "parent",
  as: "childFolders",
  onDelete: "CASCADE",
});
// one document can be in one folder, but one folder can have many documents.
db.Document.belongsTo(db.Folder, {
  foreignKey: "parent",
  as: "folder",
  onDelete: "CASCADE",
});
db.Folder.hasMany(db.Document, {
  foreignKey: "parent",
  as: "documents",
  onDelete: "CASCADE",
});
db.Folder.belongsTo(db.User, {
  foreignKey: "createdBy",
  as: "creator",
});

db.User.hasMany(db.Folder, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
  as: "createdFolders",
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
