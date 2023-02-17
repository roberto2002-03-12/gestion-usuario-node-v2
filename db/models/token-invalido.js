const { Model, DataTypes, Sequelize } = require('sequelize');

const TOKEN_INVALIDO_TABLE = 'token_invalido';

const TokeInvalidoSchema = {
    idtoken: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    token: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class TokenInvalido extends Model {
    static init(sequelize) {}
}