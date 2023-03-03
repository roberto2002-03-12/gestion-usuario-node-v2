const express = require('express');
const passport = require('passport');
const { checkRole } = require('../middlewares/auth.handler');
const validationHandler = require('../middlewares/validator.handler');
const { crearProvincia, listarProvincia, eliminarProvincia, seleccionarProvincia, cambiarProvincia } = require('../services/provincia.service');
const { crearProvinciaSchema, seleccionarProvinciaSchema, buscarProvinciaSchema, cambiarProvinciaSchema } = require('../schemas/provincia.schema');
const { checkTokenBlack } = require('../middlewares/token-valid.handler');

const router = express.Router();

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    validationHandler(crearProvinciaSchema, 'body'),
    async (req, res, next) => {
        try {
            const provincia = req.body;
            const respuesta = await crearProvincia(provincia);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/',
    validationHandler(buscarProvinciaSchema, 'query'),
    async (req, res, next) => {
        try {
            const respuesta = await listarProvincia(req?.query);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    validationHandler(seleccionarProvinciaSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await seleccionarProvincia(id);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    validationHandler(seleccionarProvinciaSchema, 'params'),
    validationHandler(cambiarProvinciaSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const respuesta = await cambiarProvincia(id, body);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validationHandler(seleccionarProvinciaSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await eliminarProvincia(id);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;