'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'token', UserSchema.token);
  },

  async down (queryInterface, Sequelize) {

  }
};
