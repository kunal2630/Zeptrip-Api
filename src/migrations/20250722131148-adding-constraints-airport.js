'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('airports', {
      fields: ['cityId'],
      type: 'foreign key',
      name: 'airport_fkey_cityId',
      references: {
        table: 'cities',
        field: 'id'
      },
      onDelete: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('airports', 'airport_fkey_cityId');
  }
};
