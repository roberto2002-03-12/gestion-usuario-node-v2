const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Sequelize } = require('sequelize');

const agregarRol = async (data) => {
    const user = await models.User.findByPk(data.userId);

    if (!user) throw boom.notFound('Usuario no encontrado');

    const rol = await models.Rol.findByPk(data.rolId);

    if (!rol) throw boom.notFound('Rol no existe');

    const nuevoRol = await models.UserRol.create(data);

    return nuevoRol;
};

const cambiarRol = async (id, data) => {
    const userRol = await models.UserRol.findByPk(id);

    if (!userRol) throw boom.notFound('Registro no encontrado');

    const respuesta = await userRol.update({
        ...data,
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
    eliminarRol
}