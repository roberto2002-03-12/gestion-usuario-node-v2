'use strict';
const { USER_ROL_TABLE } = require('../models/user-role.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(USER_ROL_TABLE, 'idrol', 'rol_id')
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
