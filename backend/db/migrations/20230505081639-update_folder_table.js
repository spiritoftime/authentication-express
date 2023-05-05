"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("folders", "folder_name", "text");
    await queryInterface.renameColumn(
      "folders",
      "parent_folder_id",
      "parent"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("folders", "text", "folder_name");
    await queryInterface.renameColumn(
      "folders",
      "parent",
      "parent_folder_id"
    );
  },
};
