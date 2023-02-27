'use strict';
const { DataTypes } = require('sequelize');
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PERFIL_TABLE, 'foto', PerfilSchema.foto);
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
