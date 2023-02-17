'use strict';
const { USER_ROL_TABLE, UserRolSchema } = require('../models/user-role.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_ROL_TABLE, UserRolSchema);
  },

  async down (queryInterface, Sequelize) {
  }
};
