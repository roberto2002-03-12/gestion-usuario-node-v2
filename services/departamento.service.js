const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const { Provincia } = require('../db/models/provincia.model');
const { Distrito } = require('../db/models/distrito.model');

const crearDepartamento = async (obj) => {
    const departamento = await models.Departamento.create(obj);

    return departamento;
};

const seleccionarDepartamento = async (id) => {
    const departamento = await models.Departamento.findByPk(id, {
        include: [{
            model: Provincia,
            as: 'provincias'
        }]
    });

    if (!departamento) throw boom.notFound('Departamento no existe');

    return departamento
}

const cambiarDepartamento = async (obj, id) => {
    const departamento = await models.Departamento.findByPk(id);

    if (!departamento) throw boom.notFound('Departamento no valido');

    const respuesta = await departamento.update(obj);

    return respuesta;
};

const listarDepartamento = async (query) => {
    const { nombre_departamento } = query || {};

    const opcion = {
        include: [{
            model: Provincia,
            as: 'provincias',
            include: [
                {
                    model: Distrito,
                    as: 'distritos'
                }
            ]
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

    return 'eliminado'
};

module.exports = {
    eliminarDepartamento,
    seleccionarDepartamento,
    listarDepartamento,
    cambiarDepartamento,
    crearDepartamento
}