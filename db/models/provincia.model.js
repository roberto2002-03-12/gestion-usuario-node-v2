const { Model, DataTypes } = require('sequelize');
const { DEPARTAMENTO_TABLE } = require('./departamento.model');

const PROVINCIA_TABLE = 'provincia';

const ProvinciaSchema = {
    idProvincia: {
        field: 'id_provincia',
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreProvincia: {
        field: 'nombre_provincia',
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    departamentoId: {
        field: 'departamento_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: DEPARTAMENTO_TABLE,
            key: 'id_departamento'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Provincia extends Model {
    static associate(models) {
        this.belongsTo(models.Departamento, {
            foreignKey: 'departamentoId',
            as: 'departamento',
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROVINCIA_TABLE,
            modelName: 'Provincia',
            timestamps: false
        }
    };
};

module.exports = {
    Provincia,
    ProvinciaSchema,
    PROVINCIA_TABLE
};