const { DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { OCUPACION_TABLE } = require('./ocupacion.model');

const PERFIL_TABLE = 'perfil';

const PerfilSchema = {
    idperfil: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    apellido: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    numCelular: {
        field: 'num_celular',
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    dni: {
        allowNull: false,
        type: DataTypes.INTEGER(8)
    },
    foto: {
        allowNull: true,
        type: DataTypes.STRING
    },
    fotoNombre: {
        allowNull: true,
        type: DataTypes.STRING
    },
    fechaNacimiento: {
        field: 'fecha_nacimiento',
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    sexo: {
        allowNull: false,
        type: DataTypes.STRING(1)
    },
    ciudad: {
        allowNull: false,
        type: DataTypes.STRING
    },
    direccion: {
        allowNull: true,
        type: DataTypes.STRING
    },
    ocupacionId: {
        field: 'ocupacion_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: OCUPACION_TABLE,
            key: 'id_ocupacion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    userId: {
        field: 'user_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'iduser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
};

class Perfil extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });

        this.belongsTo(models.Ocupacion, {
            as: 'ocupacion',
            foreignKey: 'ocupacionId'
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: PERFIL_TABLE,
            modelName: 'Perfil',
            timestamps: false
        }
    };
};

module.exports = {
    Perfil,
    PerfilSchema,
    PERFIL_TABLE
};