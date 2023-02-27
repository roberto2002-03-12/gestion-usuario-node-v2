const { User, UserSchema } = require('./user.model');
const { Perfil, PerfilSchema } = require('./perfil.model');
const { Rol, RolSchema } = require('./rol.model');
const { UserRol, UserRolSchema } = require('./user-role.model');
const { CodigoSchema, Codigo } = require('./codigos.model');
const { DepartamentoSchema, Departamento } = require('./departamento.model');
const { ProvinciaSchema, Provincia } = require('./provincia.model');
const { DistritoSchema, Distrito } = require('./distrito.model');
const { OcupacionSchema, Ocupacion } = require('./ocupacion.model');
const { TokenInvalidoSchema, TokenInvalido } = require('./token-invalido');

function setupModels(sequelize) {
    Departamento.init(DepartamentoSchema, Departamento.config(sequelize));
    Provincia.init(ProvinciaSchema, Provincia.config(sequelize));
    Distrito.init(DistritoSchema, Distrito.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Ocupacion.init(OcupacionSchema, Ocupacion.config(sequelize));
    Perfil.init(PerfilSchema, Perfil.config(sequelize));
    Rol.init(RolSchema, Rol.config(sequelize));
    UserRol.init(UserRolSchema, UserRol.config(sequelize));
    Codigo.init(CodigoSchema, Codigo.config(sequelize));
    TokenInvalido.init(TokenInvalidoSchema, TokenInvalido.config(sequelize));

    Departamento.associate(sequelize.models);
    Provincia.associate(sequelize.models);
    Distrito.associate(sequelize.models);
    User.associate(sequelize.models);
    Ocupacion.associate(sequelize.models);
    Perfil.associate(sequelize.models);
    Rol.associate(sequelize.models);
    UserRol.associate(sequelize.models);
    Codigo.associate(sequelize.models);
    TokenInvalido.associate(sequelize.models);
}

module.exports = setupModels;