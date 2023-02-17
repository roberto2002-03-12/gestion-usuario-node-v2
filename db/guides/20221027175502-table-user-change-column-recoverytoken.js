'use strict';
const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(USER_TABLE, 'recovery_token', {
      allowNull: true,
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
