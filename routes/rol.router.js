const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { asignarRol, buscarRol, queryRelacionesSchema } = require('../schemas/declare-rol.schema');
const { agregarRol, cambiarRol, obtenerRol, eliminarRol, listarRol, listarRelaciones } = require('../services/rol.service');
const { checkRole } = require('../middlewares/auth.handler');
const { checkTokenBlack } = require('../middlewares/token-valid.handler');

const router = express.Router();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    async (req, res, next) => {
        try {
            const roles = await listarRol();
            res.status(200).json(roles);
        } catch (err) {
            next(err);
        }
});

router.get('/relaciones',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    validatorHandler(queryRelacionesSchema, 'query'),
    async (req, res, next) => {
        try {
            const respuesta = await listarRelaciones(req?.query);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id', 
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    validatorHandler(buscarRol, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const rol = await obtenerRol(id);
        res.status(200).json(rol);
    } catch(err) {
        next(err);
    }
});

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validatorHandler(asignarRol, 'body'), 
    async (req, res, next) => {
    try {
        const { sub } = req.user;
        const objeto = req.body;
        const rol = await agregarRol(objeto, sub);
        res.status(201).json(rol);
    } catch(err) {
        next(err);
    }
});

router.put('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    validatorHandler(buscarRol, 'params'), 
    async (req, res, next) => {
    try {
        const { sub } = req.user;
        const { id } = req.params;
        const body = req.body;
        const cambioRol = await cambiarRol(id, body, sub);
        res.status(201).json(cambioRol);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    validatorHandler(buscarRol, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const rol = await eliminarRol(id);
        res.status(200).json(rol);
    } catch(err) {
        next(err);
    }
});

module.exports = router;