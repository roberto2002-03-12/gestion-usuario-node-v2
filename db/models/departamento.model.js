const { Model, DataTypes } = require('sequelize');

const DEPARTAMENTO_TABLE = 'departamento';

const DepartamentoSchema = {
    idDepartamento: {
        field: 'id_departamento',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER 
    },
    nombreDepartamento: {
        field: 'nombre_departamento',
        allowNull: false,
        type: DataTypes.STRING(45)
    }
}

class Departamento extends Model {
    static associate(models) {
        //ToDo this has many
        this.hasMany(models.Provincia, {
            as: 'provincia',
            foreignKey: 'departamentoId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DEPARTAMENTO_TABLE,
            modelName: 'Departamento',
            timestamps: false
        }
    }
}

module.exports = {
    Departamento,
    DepartamentoSchema,
    DEPARTAMENTO_TABLE
}