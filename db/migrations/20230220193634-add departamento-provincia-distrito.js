'use strict';
const { DepartamentoSchema, DEPARTAMENTO_TABLE } = require('../models/departamento.model');
const { ProvinciaSchema, PROVINCIA_TABLE } = require('../models/provincia.model');
const { DistritoSchema, DISTRITO_TABLE } = require('../models/distrito.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DEPARTAMENTO_TABLE, DepartamentoSchema);
    await queryInterface.createTable(PROVINCIA_TABLE, ProvinciaSchema);
    await queryInterface.createTable(DISTRITO_TABLE, DistritoSchema);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
