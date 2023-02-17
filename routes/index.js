const express = require('express');
const perfilRouter = require('./perfil.router');
const rolRouter = require('./rol.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const codigoRouter = require('./codigo.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/auth', authRouter);
    router.use('/perfil', perfilRouter);
    router.use('/rol', rolRouter);
    router.use('/user', userRouter);
    router.use('/codigo', codigoRouter);
};

module.exports = routerApi;