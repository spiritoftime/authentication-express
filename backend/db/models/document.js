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
      },
      data: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
    },
    { underscored: true }
  );
  return Document;
}
module.exports = initDocument;
