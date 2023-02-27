'use strict';
const { DISTRITO_TABLE, DistritoSchema } = require('../models/distrito.model');
const { PROVINCIA_TABLE, ProvinciaSchema } = require('../models/provincia.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PROVINCIA_TABLE, 'departamento_id', ProvinciaSchema.departamentoId);
    await queryInterface.addColumn(DISTRITO_TABLE, 'provincia_id', DistritoSchema.provinciaId);
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
