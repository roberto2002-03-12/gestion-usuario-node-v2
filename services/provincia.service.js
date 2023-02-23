const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const { Distrito } = require('../db/models/distrito.model');

const crearProvincia = async (obj) => {
    const provincia = await models.Provincia.create(obj);

    return provincia;
};

const cambiarProvincia = async (id, obj) => {
    const provincia = await models.Provincia.findByPk(id);

    if (!provincia) throw boom.notFound('Provincia no encontrada');

    const respuesta = await provincia.update(obj);

    return respuesta;
};

const listarProvincia = async (query) => {
    const { nombre_provincia } = query || {};

    const opcion = {
        include: [{
            model: Distrito,
            as: 'distritos'
        }],
        where: {}
    };

    if (nombre_provincia) {
        opcion.where = {
            nombreProvincia: {
                [Op.like]: '%' + nombre_provincia + '%'
            }
        };
    };

    const provincias = await models.Provincia.findAll(opcion);

    return provincias;
};

const eliminarProvincia = async (id) => {
    const provincia = await models.Provincia.findByPk(id);

    if (!provincia) throw boom.notFound('No puedes eliminar algo que no existe');

    await provincia.destroy();

    return 'eliminado';
};

const seleccionarProvincia = async (id) => {
    const provincia = await models.Provincia.findByPk(id);

    if (!provincia) throw boom.notFound('No existe esa provincia');

    return provincia; 
};

module.exports = {
    crearProvincia,
    listarProvincia,
    cambiarProvincia,
    eliminarProvincia,
    seleccionarProvincia
};