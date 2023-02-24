const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { Provincia } = require('../db/models/provincia.model');
const { Departamento } = require('../db/models/departamento.model');
const boom = require('@hapi/boom');

const listarDistritos = async (query) => {
    const { nombre_distrito } = query || {};
    
    const opcion = {
        include: [{
            model: Provincia,
            as: 'provincia'
        }],
        where: {}
    };

    if (nombre_distrito) {
        opcion.where = {
            nombreDistrito: {
                [Op.like]: '%' + nombre_distrito + '%'
            }
        };
    };

    const distritos = await models.Distrito.findAll(opcion);

    return distritos;
};

const seleccionarDistrito = async (id) => {
    const distrito = await models.Distrito.findByPk(id, {
        include: [{
            model: Provincia,
            as: 'provincia',
            include: [{
                model: Departamento,
                as: 'departamento'
            }]
        }]
    });

    if (!distrito) throw boom.notFound('Distrito no encontrado');

    return distrito;
};

const crearDistrito = async (obj) => {
    const distrito = await models.Distrito.create(obj);

    return distrito;
};

const cambiarDistrito = async (id, obj) => {
    const distrito = await models.Distrito.findByPk(id);

    if (!distrito) throw boom.notFound('No puedes cambiar algo que no existe');

    const respuesta = await distrito.update(obj);

    return respuesta;
};

const eliminarDistrito = async (id) => {
    const distrito = await models.Distrito.findByPk(id);

    if (!distrito) throw boom.notFound('No puedes eliminar algo que no existe');

    const respuesta = await distrito.destroy();

    return respuesta;
};

module.exports = {
    listarDistritos,
    seleccionarDistrito,
    crearDistrito,
    cambiarDistrito,
    eliminarDistrito
};