"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("documents", "title", "text");
    await queryInterface.renameColumn("documents", "folder_id", "parent");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("documents", "text", "title");
    await queryInterface.renameColumn("documents", "parent", "folder_id");
  },
};
