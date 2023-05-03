const { sequelize, DataTypes } = require("sequelize");
function initUserFolderAccess(sequelize) {
  const UserFolderAccess = sequelize.define(
    "UserFolderAccess",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      folderId: {
        defaultValue: null,
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: "folders",
          key: "id",
        },
      },
    },
    {
      underscored: true,
      tableName: "user_folder_access",
    }
  );
  return UserFolderAccess;
}
module.exports = initUserFolderAccess;
