"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("folders", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("folders", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("folders", "created_at");
    await queryInterface.removeColumn("folders", "updated_at");
  },
};
