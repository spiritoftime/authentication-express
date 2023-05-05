"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("documents", [
      {
        id: "81fcb940-400f-4dfe-9630-d9bfc98987f4",
        text: "Untitled Document",
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
      {
        created_at: new Date(),
        updated_at: new Date(),
        id: "6c228b2d-c165-4699-a734-08c3c5b23fe8",
        text: "Random Rant",
        created_by: 3,
        data: JSON.stringify({
          ops: [
            {
              insert: "jesus christ yeah damn.",
            },
            {
              insert: "\n",
              attributes: {
                blockquote: true,
              },
            },
            {
              insert: "def chickenfeet(node):",
            },
            {
              insert: "\n",
              attributes: {
                "code-block": true,
              },
            },
            {
              insert: "  return node",
            },
            {
              insert: "\n",
              attributes: {
                "code-block": true,
              },
            },
            {
              insert: "total total shame. holy smokes broooooo\n",
            },
            {
              insert: "\n",
            },
          ],
        }),
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        id: "be0255b0-b6e2-41ae-accc-38f379daa408",
        text: "Custom Hook Example 1",
        parent: "488db8e7-59a5-4fda-9f63-dc48f5e1e2b3",
        created_by: 1,
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
