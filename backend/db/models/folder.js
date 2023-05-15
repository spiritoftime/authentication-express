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
      parent: {
        defaultValue: null,
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: "folders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      text: {
        // folderName, called it text to fit react dnd
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { underscored: true }
  );
  return Folder;
}
module.exports = initFolder;
