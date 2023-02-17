const { Model, DataTypes, Sequelize } = require('sequelize');

/*¿Cómo va funcionar?*/

const CODIGO_TABLE = 'codigos';

const CodigoSchema = {
    idcodigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    codigo: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },
    createdBy: {
        field: 'created_by',
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    usedBy: {
        field: 'used_by',
        allowNull: true,
        type: DataTypes.STRING
    },
    usedAt: {
        field: 'used_at',
        allowNull: true,
        type: DataTypes.DATE
    },
    active: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    }
};

class Codigo extends Model {
    static associate(models) {
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CODIGO_TABLE,
            modelName: 'Codigo',
            timestamps: false
        }
    }
}

module.exports = {
    Codigo,
    CodigoSchema,
    CODIGO_TABLE
}