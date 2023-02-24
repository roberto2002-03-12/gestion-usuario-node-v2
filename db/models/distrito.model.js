const { Model, DataTypes } = require('sequelize');
const { PROVINCIA_TABLE } = require('./provincia.model');

const DISTRITO_TABLE = 'distrito';

const DistritoSchema = {
    idDistrito: {
        field: 'id_distrito',
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreDistrito: {
        field: 'nombre_distrito',
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    provinciaId: {
        field: 'provincia_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: PROVINCIA_TABLE,
            key: 'id_provincia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Distrito extends Model {
    static associate(models) {
        this.belongsTo(models.Provincia, {
            as: 'provincia',
            foreignKey: 'provinciaId'
        });

        this.hasMany(models.User, {
            as: 'distrito',
            foreignKey: 'distritoId'
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: DISTRITO_TABLE,
            modelName: 'Distrito',
            timestamps: false
        };
    };
};

module.exports = {
    Distrito,
    DISTRITO_TABLE,
    DistritoSchema
};