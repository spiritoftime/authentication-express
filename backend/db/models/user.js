const { sequelize, DataTypes } = require("sequelize");
function initUser(sequelize) {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );
  return User;
}
module.exports = initUser;
