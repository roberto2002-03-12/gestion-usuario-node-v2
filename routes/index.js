const express = require('express');
const perfilRouter = require('./perfil.router');
const rolRouter = require('./rol.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const codigoRouter = require('./codigo.router');
const departamentoRouter = require('./departamento.router');
const provinciaRouter = require('./provincia.router');
const distritoRouter = require('./distrito.router');
const ocupacionRouter = require('./ocupacion.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/auth', authRouter);
    router.use('/perfil', perfilRouter);
    router.use('/rol', rolRouter);
    router.use('/user', userRouter);
    router.use('/codigo', codigoRouter);
    router.use('/departamento', departamentoRouter);
    router.use('/provincia', provinciaRouter);
    router.use('/distrito', distritoRouter);
    router.use('/ocupacion', ocupacionRouter);
};

module.exports = routerApi;