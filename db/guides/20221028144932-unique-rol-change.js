'use strict';
const { ROL_TABLE, RolSchema } = require('../models/rol.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(ROL_TABLE, 'rol', RolSchema.rol);
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
