"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("documents", [
      {
        id: "81fcb940-400f-4dfe-9630-d9bfc98987f4",
        created_by: 1,
        data: JSON.stringify({
          ops: [
            {
              insert: "sasaadfkakfd\n\n",
            },
            {
              attributes: {
                bold: true,
              },
              insert: "oasskhaslasjasl",
            },
            {
              insert: "\n",
            },
          ],
        }),

        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("documents", null, {});
  },
};
