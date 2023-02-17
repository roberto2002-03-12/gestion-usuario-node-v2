'use strict';
const { ROL_TABLE, RolSchema } = require('../models/rol.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ROL_TABLE, RolSchema);
  },

  async down (queryInterface, Sequelize) {

  }
};
