'use strict';
const { ROL_TABLE, RolSchema } = require('../models/rol.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(ROL_TABLE, 'rol', RolSchema.rol);
  },

  async down (queryInterface, Sequelize) {
  }
};
