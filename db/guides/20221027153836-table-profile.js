'use strict';

const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PERFIL_TABLE, PerfilSchema);
  },

  async down (queryInterface, Sequelize) {

  }
};
