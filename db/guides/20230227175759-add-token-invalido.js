'use strict';
const { TOKEN_INVALIDO_TABLE, TokenInvalidoSchema } = require('../models/token-invalido');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TOKEN_INVALIDO_TABLE, TokenInvalidoSchema);
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
