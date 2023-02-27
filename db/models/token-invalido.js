const { Model, DataTypes, Sequelize } = require('sequelize');

const TOKEN_INVALIDO_TABLE = 'token_invalido';

const TokenInvalidoSchema = {
    idtoken: {
        field: 'id_token',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    token: {
        allowNull: false,
        type: DataTypes.STRING
    },
    addedAt: {
        field: 'added_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    addedBy: {
        field: 'added_by',
        allowNull: false,
        type: DataTypes.STRING(65)
    }
}

class TokenInvalido extends Model {
    static associate(models) {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TOKEN_INVALIDO_TABLE,
            modelName: 'TokenInvalido',
            timestamps: false
        }
    }
};

module.exports = {
    TokenInvalido,
    TokenInvalidoSchema,
    TOKEN_INVALIDO_TABLE
};