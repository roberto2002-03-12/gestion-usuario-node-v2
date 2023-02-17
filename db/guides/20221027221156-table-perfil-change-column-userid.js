'use strict';
const { PERFIL_TABLE } = require('../models/perfil.model');
const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PERFIL_TABLE, 'user_id', {
      field: 'user_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'iduser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {

  }
};
