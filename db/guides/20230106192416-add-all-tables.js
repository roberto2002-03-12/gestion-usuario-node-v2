'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');
const { CODIGO_TABLE, CodigoSchema } = require('../models/codigos.model');
const { ROL_TABLE, RolSchema } = require('../models/rol.model');
const { USER_ROL_TABLE, UserRolSchema } = require('../models/user-role.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PERFIL_TABLE, PerfilSchema);
    await queryInterface.createTable(ROL_TABLE, RolSchema);
    await queryInterface.createTable(USER_ROL_TABLE, UserRolSchema);
    await queryInterface.createTable(CODIGO_TABLE, CodigoSchema)
  },

  async down (queryInterface, Sequelize) {

  }
};
