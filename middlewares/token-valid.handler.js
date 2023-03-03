const boom = require('@hapi/boom');
const { buscarToken } = require('../services/tokens.service');

function checkTokenBlack() {
    return async (req, res, next) => {
        const tokenBearer = req.headers.authorization;
        const token = tokenBearer.split(' ');
        
        const rta = await buscarToken(token[1]);

        if (rta) next(boom.unauthorized('Por favor vuelva a iniciar sesión'));

        next();
    }
};

module.exports = {
    checkTokenBlack
}