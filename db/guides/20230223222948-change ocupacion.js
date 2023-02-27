'use strict';
//nota: hacer lo mismo con ""
const { OCUPACION_TABLE, OcupacionSchema } = require('../models/ocupacion.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(OCUPACION_TABLE, 'nombre_ocupacion', OcupacionSchema.nombreOcupacion);
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
