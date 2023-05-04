"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("documents", "folder_id", {
      defaultValue: null,
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "folders", // The table name in the database
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("documents", "folder_id");
  },
};
