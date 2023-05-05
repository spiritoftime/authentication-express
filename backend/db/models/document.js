const { sequelize, DataTypes } = require("sequelize");
function initDocument(sequelize) {
  const Document = sequelize.define(
    "Document",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users", // The table name in the database
          key: "id",
        },
        onDelete: "CASCADE",
      },
      data: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      text: {
        allowNull: false,
        type: DataTypes.TEXT,
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
    },
    { underscored: true }
  );
  return Document;
}
module.exports = initDocument;
