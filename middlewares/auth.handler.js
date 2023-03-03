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
        for (i = 0; i < user.role.length; i++) {
            if (roles.includes(user.role[i])) {
                return next();
            }
        }
        next(boom.unauthorized('No tienes permisos'));
    }
};

module.exports = {
    checkApiKey,
    checkAdminRole,
    checkRole
};