"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Categories", [
      {
        category_name: "Pakaian",
      },
      {
        category_name: "Celana",
      },
      {
        category_name: "Baju",
      },
      {
        category_name: "Teknologi",
      },
      {
        category_name: "Komputer",
      },
      {
        category_name: "Handphone",
      },
      {
        category_name: "Alat Rumah Tangga",
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
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
