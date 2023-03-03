'use strict';
const { USER_ROL_TABLE, UserRolSchema } = require('../models/user-role.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_ROL_TABLE, 'assigned_to', UserRolSchema.assignedTo);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
