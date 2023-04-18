"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "derpina",
        username: "derpina",
        password:
          "$2b$10$yghbD0VbdEJrD.Dogv791OSakJKqktt426622vkcqkgxFra/p1d7G",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kyle",
        username: "Kyle1234",

        password:
          "$2y$12$S8vE5am1ZK.NeZcoI4W4d.T3iHc9XnIzvr33UW8iPv5OKZbi/C6Ua",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
