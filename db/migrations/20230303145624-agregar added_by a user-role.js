'use strict';
const { UserRolSchema, USER_ROL_TABLE } = require('../models/user-role.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_ROL_TABLE, 'assigned_by', UserRolSchema.assignedBy)
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
