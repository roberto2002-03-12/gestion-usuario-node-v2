const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op, Sequelize } = require('sequelize');

const buscarToken = async (token) => {
    const tokenBuscado = await models.TokenInvalido.findOne({
        where: {
            token: token
        }
    });

    return tokenBuscado;
};

const listarListaInvalida = async (query) => {
    const { added_by, added_at, limit, offset } = query || {};
    console.log(added_by)
    const opciones = {
        where: {},
        limit: 20,
        offset: 0
    };
    
    if (added_by) {
        opciones.where = {
            addedBy: {
                [Op.like]: '%' + added_by + '%'
            }
        };
    };
    
    if (added_at) {
        opciones.where = Sequelize.and(
            opciones.where, {addedAt: {[Op.gte]: added_at}}
        );
    };
    
    if (limit) opciones.limit = parseInt(limit);
    if (offset) opciones.limit = parseInt(offset);

    const listaTokens = await models.TokenInvalido.findAll(opciones);

    return listaTokens;
};

const agregarToken = async (iduser, sub) => {
    const user = await models.User.findByPk(iduser.iduser);
    const addedBy = await models.User.findByPk(sub);

    if (!user) throw boom.notFound('No puedes desactivar token de un usuario que no existe');
    if (!addedBy) throw boom.notFound('No se encontro los datos del que quiere agregar el token');

    const respuesta = await models.TokenInvalido.create({
        token: user.dataValues.tokenLogged,
        bannedTo: user.dataValues.email,
        addedBy: addedBy.dataValues.email
    });

    return respuesta;
};

const eliminarDeListaToken = async (idtoken) => {
    const tokenEncontrado = await models.TokenInvalido.findByPk(idtoken);

    if (!tokenEncontrado) throw boom.notFound('No existe token');

    await tokenEncontrado.destroy();

    return 'Token quitado';
};

const buscarTokenId = async (id) => {
    const token = await models.TokenInvalido.findByPk(id);

    if (!token) throw boom.notFound('No existe');

    return token;
};

module.exports = {
    buscarToken,
    listarListaInvalida,
    agregarToken,
    eliminarDeListaToken,
    buscarTokenId
};