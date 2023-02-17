const { DataTypes, Model, Sequelize } = require('sequelize');

const ROL_TABLE = 'rol';

const RolSchema = {
    idrol: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    rolName: {
        field: 'rol_name',
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT('medium'),
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
};

class Rol extends Model {
    static associate(models) {
        this.belongsToMany(models.User, {
            through: 'user_has_rol',
            foreignKey: 'rol_id',
            otherKey: 'user_id'
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: ROL_TABLE,
            modelName: 'Rol',
            timeStamps: false
        }
    };
};

module.exports = {
    Rol,
    RolSchema,
    ROL_TABLE
}