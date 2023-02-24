'use strict';
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');
const { USER_TABLE, UserSchema } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PERFIL_TABLE, 'distrito_id', PerfilSchema.distritoId);
    await queryInterface.removeColumn(USER_TABLE, 'token');
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
