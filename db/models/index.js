const { User, UserSchema } = require('./user.model');
const { Perfil, PerfilSchema } = require('./perfil.model');
const { Rol, RolSchema } = require('./rol.model');
const { UserRol, UserRolSchema } = require('./user-role.model');
const { CodigoSchema, Codigo } = require('./codigos.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Perfil.init(PerfilSchema, Perfil.config(sequelize));
    Rol.init(RolSchema, Rol.config(sequelize));
    UserRol.init(UserRolSchema, UserRol.config(sequelize));
    Codigo.init(CodigoSchema, Codigo.config(sequelize));

    User.associate(sequelize.models);
    Perfil.associate(sequelize.models);
    Rol.associate(sequelize.models);
    UserRol.associate(sequelize.models);
    Codigo.associate(sequelize.models);
}

module.exports = setupModels;