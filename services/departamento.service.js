const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const { Provincia } = require('../db/models/provincia.model');

const crearDepartamento = async (obj) => {
    const departamento = await models.Departamento.create(obj);

    return departamento;
};

const cambiarDepartamento = async (obj, id) => {
    const departamento = await models.Departamento.findByPk(id);

    if (!departamento) throw boom.unauthorized('Departamento no valido');

    const respuesta = await departamento.update(obj);

    return respuesta;
};

const listarDepartamento = async (query) => {
    const { nombre_departamento } = query || {};

    const opcion = {
        include: [{
            model: Provincia,
            as: 'provincias'
        }],
        where: {}
    }

    if (nombre_departamento) {
        opcion.where = {
            nombreDepartamento: {
                [Op.like]: '%' + query + '%'
            }
        }
    }

    const departamento = await models.Departamento.findAll(opcion);

    return departamento;
};

const eliminarDepartamento = async (id) => {
    const departamento = await models.Departamento.findByPk(id);
    
    if (!departamento) throw boom.unauthorized('Departamento no valido');

    await departamento.destroy();
};

module.exports = {
    eliminarDepartamento,
    listarDepartamento,
    cambiarDepartamento,
    crearDepartamento
}