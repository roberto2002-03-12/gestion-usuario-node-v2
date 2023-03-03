const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op, Sequelize } = require('sequelize');

const listarRol = async () => {
    const roles = await models.Rol.findAll();
    return roles;
};

const listarRelaciones = async (query) => {
    const { assigned_by, created_at, limit, offset } = query || {};

    const opciones = {
        where: {},
        limit: 20,
        offset: 0
    }

    if (assigned_by) opciones.where = { assignedBy: {[Op.like]: '%' + assigned_by + '%' }};
    if (created_at) opciones.where = Sequelize.and(opciones.where, { createdAt: {[Op.gte]: created_at} });

    if (limit) opciones.limit = parseInt(limit);
    if (offset) opciones.offset = parseInt(offset);

    const listaRelaciones = await models.UserRol.findAll(opciones);

    return listaRelaciones;
};

const agregarRol = async (data, sub) => {
    const user = await models.User.findByPk(data.userId);
    const userAssigned = await models.User.findByPk(sub);

    if (!user) throw boom.notFound('Usuario no encontrado');
    if (!userAssigned) throw boom.notFound('El usuario que va asignar el rol no ha sido encontrado');

    const rol = await models.Rol.findByPk(data.rolId);

    if (!rol) throw boom.notFound('Rol no existe');

    const nuevoRol = await models.UserRol.create({
        ...data,
        assignedBy: userAssigned.dataValues.email,
        assignedTo: user.dataValues.email
    });

    return nuevoRol;
};

const cambiarRol = async (id, data, sub) => {
    const userRol = await models.UserRol.findByPk(id);
    const userAssigned = await models.User.findByPk(sub);

    if (!userRol) throw boom.notFound('Registro no encontrado');
    if (!userAssigned) throw boom.notFound('Registro no encontrado');

    const respuesta = await userRol.update({
        ...data,
        assignedBy: userAssigned.dataValues.email,
        updatedAt: new Date().getTime()
    });

    return respuesta;
};

const obtenerRol = async (id) => {
    const userRol = await models.UserRol.findByPk(id);
    console.log(today);
    return userRol;
};

const eliminarRol = async (id) => {
    const userRol = await models.UserRol.findByPk(id);
    await userRol.destroy(id);
    return userRol;
};

module.exports = {
    agregarRol,
    cambiarRol,
    obtenerRol,
    eliminarRol,
    listarRol,
    listarRelaciones
}