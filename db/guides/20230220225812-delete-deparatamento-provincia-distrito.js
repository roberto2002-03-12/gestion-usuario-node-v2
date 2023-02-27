'use strict';
const { DEPARTAMENTO_TABLE } = require('../models/departamento.model');
const { PROVINCIA_TABLE } = require('../models/provincia.model');
const { DISTRITO_TABLE } = require('../models/distrito.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(DEPARTAMENTO_TABLE);
    await queryInterface.dropTable(PROVINCIA_TABLE);
    await queryInterface.dropTable(DISTRITO_TABLE);
  }
};
