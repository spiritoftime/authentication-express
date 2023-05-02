"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("folders", [
      {
        id: "857b7472-9122-43e2-bd74-ec4d1f9df25d",
        folder_name: "React",
        created_by: 1,
      },
      {
        created_by: 1,
        id: "488db8e7-59a5-4fda-9f63-dc48f5e1e2b3",
        parent_folder_id: "857b7472-9122-43e2-bd74-ec4d1f9df25d",
        folder_name: "Custom Hooks",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_document_access");
  },
};
