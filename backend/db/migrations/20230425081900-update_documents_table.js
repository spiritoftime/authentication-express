"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("documents", "created_by");
    await queryInterface.renameColumn("documents", "user_id", "created_by");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("documents", "created_by", "user_id");
    await queryInterface.addColumn("documents", "created_by", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },
};
