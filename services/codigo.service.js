const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getUserById } = require('./user.service');
const { Sequelize, Op } = require('sequelize');

const generarCodigo = async (idtoken) => {
    const usuario = await getUserById(idtoken);
    
    const email = usuario.dataValues.email;
    const codigo = await models.Codigo.create({
        createdBy: email,
        active: 1
    });

    return codigo;
};

const utilizarCodigo = async (clave, email) => {
    const codigo = await models.Codigo.findOne({
        where: {
            codigo: clave,
            active: 1
        }
    });

    if (!codigo) throw boom.unauthorized('Código no valido');

    const respuesta = await codigo.update({
        usedBy: email,
        usedAt: new Date().getTime(),
        active: 0
    });

    return respuesta;
};

const listarCodigos = async (query) => {
    const { created_by, created_at, used_by, used_at, 
            active, limit, offset } = query || {};

    const opciones = {
        where: {},
        limit: 20,
        offset: 0
    };

    if (created_by) {
        opciones.where = { 
            createdBy: { 
                [Op.like]: '%' + created_by + '%' 
            } 
        };
    };
    
    if (created_at) {
        opciones.where = Sequelize.and(opciones.where, {
            createdAt: {
                [Op.gte]: created_at
            }
        });
    };

    if (used_by) {
        opciones.where = Sequelize.and(opciones.where, {
            usedBy: {
                [Op.like]: '%' + used_by + '%'
            }
        });
    };

    if (used_at) {
        opciones.where = Sequelize.and(opciones.where, {
            usedAt: {
                [Op.gte]: used_at
            }
        });
    };

    if (active) {
        opciones.where = Sequelize.and(opciones.where, {
            active: active
        });
    };

    if (limit) opciones.limit = parseInt(limit);
    if (offset) opciones.offset = parseInt(offset);

    const codigos = await models.Codigo.findAll(opciones);
    return codigos;
};

const obtenerCodigo = async (id) => {
    const codigo = await models.Codigo.findByPk(id);
    if (!codigo) throw boom.notFound('Código no existe');
    return codigo;
};

module.exports = {
    generarCodigo,
    utilizarCodigo,
    listarCodigos,
    obtenerCodigo
}