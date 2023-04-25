"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_document_access", [
      {
        user_id: 1,
        document_id: "81fcb940-400f-4dfe-9630-d9bfc98987f4",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_document_access");
  },
};
