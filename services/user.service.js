const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const { Rol } = require('../db/models/rol.model')

const getUserById = async (id) => {
    const user = await models.User.findByPk(id, {
        include: ['rol']
    });
    /*
    por temas de seguridad es mejor utilizar unauthorized
    debido a que si le indicamos que no existe el atacador
    va saber que no debe intentar con ese dato y seguir buscando
    hasta alcanzar con uno, en cambio con unauthorized va
    seguir intentando con ese mismo usuario, sin saber que en
    realidad ese usuarios no existe 
    */
    //correccion esto va a auth.service no a user.service
    if (!user) throw boom.notFound('Sin permisos');
    //de esta manera obtengo el rol del usuario
    //const rol = user?.rol[0].dataValues.rolName;
    //console.log(rol);
    delete user.dataValues.password;
    return user;
}

const getUserByEmail = async (email) => {
    const user = await models.User.findOne({ 
        where: {email: email},
        include: [{
            model: Rol,
            as: 'rol',
            attributes: {
                exclude: ['idrol','createdAt']
            }
        }, 'perfil'],
        attributes: {
            exclude: ['recoveryToken','createdAt']
        }
    });
    
    return user;
};

const updateUser = async (id, cambios) => {
    const user = await models.User.findByPk(id);
    const respuesta = await user.update(cambios);
    return respuesta;
};

const activateUser = async (id, estado) => {
    const user = await models.User.findByPk(id);
    await user.update({ active: estado })
    return 'Actualizado';
};

const changePassword = async (id, contrasena) => {
    const user = await models.User.findByPk(id);
    
    if (!user) throw boom.unauthorized('no valido');

    const hash = await bcrypt.hash(contrasena, 10);

    await user.update({ password: hash });
    
    return 'Contraseña actualizada';
};

const updateToken = async (id, token) => {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.unauthorized('no valido');

    await user.update({ token: token });
};

const validateRole = async (token) => {
    
};

module.exports = {
    getUserById,
    getUserByEmail,
    updateUser,
    activateUser,
    changePassword,
    updateToken
}