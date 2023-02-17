'use strict';
const { DataTypes } = require('sequelize');
const { PERFIL_TABLE } = require('../models/perfil.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PERFIL_TABLE, 'sexo', {
      allowNull: false,
      type: DataTypes.STRING(1)
    });
  },
  async down (queryInterface, Sequelize) {
  }
};
