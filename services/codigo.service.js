const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getUserById } = require('./user.service');

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

const listarCodigos = async () => {
    const codigos = await models.Codigo.findAll();
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