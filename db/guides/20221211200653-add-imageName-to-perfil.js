'use strict';
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PERFIL_TABLE, 'fotoNombre', PerfilSchema.fotoNombre);
  },

  async down (queryInterface, Sequelize) {
  }
};
