const { DataTypes, Model } = require('sequelize');

const OCUPACION_TABLE = 'ocupacion';

const OcupacionSchema = {
    idOcupacion: {
        field: 'id_ocupacion',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombreOcupacion: {
        field: 'nombre_ocupacion',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(45)
    }
};

class Ocupacion extends Model {
    static associate(models) {
        this.hasMany(models.Perfil, {
            as: 'perfil',
            foreignKey: 'ocupacionId'
        })
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: OCUPACION_TABLE,
            modelName: 'Ocupacion',
            timestamps: false
        }
    };
};

module.exports = {
    Ocupacion,
    OcupacionSchema,
    OCUPACION_TABLE
};