const { sequelize, DataTypes } = require("sequelize");
function initFolder(sequelize) {
  const Folder = sequelize.define(
    "Folder",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      parentFolderId: {
        defaultValue: null,
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: "folders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      folderName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Folder;
}
module.exports = initFolder;
