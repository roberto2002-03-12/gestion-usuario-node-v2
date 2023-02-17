const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
    const apiKey = req.heade['api'];

    if (apiKey === config.apiKey) next();

    next(boom.unauthorized());
};

function checkAdminRole(req, res, next) {
    const user = req.user;
    if (user.role === 'admin') next();
    next(boom.unauthorized('No hay permisos'));
};

function checkRole(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if(roles.includes(user.role)) {
            next();
        } else {
            next(boom.unauthorized('No tienes permiso'));
        }
    }
};

module.exports = {
    checkApiKey,
    checkAdminRole,
    checkRole
};