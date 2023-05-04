"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("folders", {
      id: {
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users", // The table name in the database
          key: "id",
        },
        onDelete: "CASCADE",

      },
      parent_folder_id: {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: "folders", // The table name in the database
          key: "id",
        },
        onDelete: "CASCADE",

      },
      folder_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("folders");
  },
};
