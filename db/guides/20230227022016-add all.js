'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CODIGO_TABLE, CodigoSchema } = require('../models/codigos.model');
const { DEPARTAMENTO_TABLE, DepartamentoSchema } = require('../models/departamento.model');
const { DISTRITO_TABLE, DistritoSchema } = require('../models/distrito.model');
const { OCUPACION_TABLE, OcupacionSchema } = require('../models/ocupacion.model');
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfil.model');
const { PROVINCIA_TABLE, ProvinciaSchema } = require('../models/provincia.model');
const { ROL_TABLE, RolSchema } = require('../models/rol.model');
const { TOKEN_INVALIDO_TABLE, TokeInvalidoSchema } = require('../models/token-invalido');
const { USER_ROL_TABLE, UserRolSchema } = require('../models/user-role.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(OCUPACION_TABLE, OcupacionSchema);
    await queryInterface.createTable(DEPARTAMENTO_TABLE, DepartamentoSchema);
    await queryInterface.createTable(PROVINCIA_TABLE, ProvinciaSchema);
    await queryInterface.createTable(DISTRITO_TABLE, DistritoSchema);
    await queryInterface.createTable(PERFIL_TABLE, PerfilSchema);
    await queryInterface.createTable(ROL_TABLE, RolSchema);
    await queryInterface.createTable(USER_ROL_TABLE, UserRolSchema);
    await queryInterface.createTable(CODIGO_TABLE, CodigoSchema);
    await queryInterface.createTable(TOKEN_INVALIDO_TABLE, TokeInvalidoSchema);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
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
