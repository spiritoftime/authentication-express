"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_folder_access", "role", {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ["creator", "collaborator", "viewer"],
      defaultValue: "viewer",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user_folder_access", "role");
  },
};
