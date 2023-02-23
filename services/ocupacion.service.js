const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

const listarOcupacion = async () => {
    const trabajos = await models.Ocupacion.findAll();

    return trabajos;
};

const seleccionarOcupacion = async (id) => {
    const trabajo = await models.Ocupacion.findByPk(id);

    return trabajo;
};

const crearOcupacion = async (obj) => {
    const trabajo = await models.Ocupacion.create(obj);

    return trabajo;
};

const cambiarOcupacion = async (id, obj) => {
    const trabajo = await models.Ocupacion.findByPk(id);

    if (!trabajo) throw boom.notFound('No puedes cambiar algo que no existe');

    const respuesta = await trabajo.update(obj);

    return respuesta;
};

const eliminarOcupacion = async (id) => {
    const trabajo = await models.Ocupacion.findByPk(id);

    if (!trabajo) throw boom.notFound('No puedes eliminar algo que no existe');

    await trabajo.destroy();
    
    return 'eliminado';
};

module.exports = {
    listarOcupacion,
    seleccionarOcupacion,
    crearOcupacion,
    cambiarOcupacion,
    eliminarOcupacion
}