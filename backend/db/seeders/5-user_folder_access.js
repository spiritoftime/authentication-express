"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_folder_access", [
      {
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        folder_id: "857b7472-9122-43e2-bd74-ec4d1f9df25d",
      },
      {
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        folder_id: "488db8e7-59a5-4fda-9f63-dc48f5e1e2b3",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_folder_access");
  },
};
