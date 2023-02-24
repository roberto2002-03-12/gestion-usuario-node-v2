const { Model, DataTypes, Sequelize } = require('sequelize');
const USER_TABLE = 'users';

const UserSchema = {
    iduser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    active: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    }
};

class User extends Model {
    static associate(models) {
        this.hasOne(models.Perfil, {
            as: 'perfil',
            foreignKey: 'userId'
        });

        this.belongsToMany(models.Rol, {
            as: 'rol',
            through: 'user_has_rol',
            foreignKey: 'user_id',
            otherKey: 'rol_id'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
};

module.exports = {
    User,
    UserSchema,
    USER_TABLE
};