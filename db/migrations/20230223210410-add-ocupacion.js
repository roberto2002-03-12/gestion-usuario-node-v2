'use strict';
const { OCUPACION_TABLE, OcupacionSchema } = require('../models/ocupacion.model');
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(OCUPACION_TABLE, OcupacionSchema);
    await queryInterface.removeColumn(PERFIL_TABLE, 'ocupacion');
    await queryInterface.removeColumn(PERFIL_TABLE, 'ciudad');
    await queryInterface.addColumn(PERFIL_TABLE, 'ocupacion_id', PerfilSchema.ocupacionId);
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
