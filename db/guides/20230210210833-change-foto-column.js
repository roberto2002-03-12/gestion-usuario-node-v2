'use strict';

const { DataTypes } = require('sequelize');
const { PERFIL_TABLE } = require('../models/perfil.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PERFIL_TABLE, 'foto', {
      allowNull: true,
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
