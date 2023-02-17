const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { ROL_TABLE } = require('./rol.model');

const USER_ROL_TABLE = 'user_has_rol';

const UserRolSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: USER_TABLE,
            key: 'iduser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    rolId: {
        type: DataTypes.INTEGER,
        field: 'rol_id',
        references: {
            model: ROL_TABLE,
            key: 'idrol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: true,
        field: 'updated_at',
        type: DataTypes.DATE,
    }
};

class UserRol extends Model {
    static associate(models) {
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_ROL_TABLE,
            modelName: 'UserRol',
            timestamps: false
        };
    };
};

module.exports = {
    UserRol,
    UserRolSchema,
    USER_ROL_TABLE
}