const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

const buscarToken = async (token) => {
    const token = await models.TokenInvalido.findOne({
        where: {
            token: token
        }
    });

    if (token) throw boom.unauthorized('Token invalido, por favor vuelva a iniciar sesión');
};

const listarListaInvalida = async (query) => {
    const opciones = {
        where: {

        },
        limit: 20,
        offset: 0
    }

    const listaTokens = await models.TokenInvalido.findAll();
};