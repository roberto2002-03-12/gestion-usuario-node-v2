const express = require('express');
const passport = require('passport');
const { checkRole } = require('../middlewares/auth.handler');
const validationHandler = require('../middlewares/validator.handler');
const { crearDistritoSchema, buscarDistritoSchema, seleccionarDistritoSchema, cambiarDistritoSchema } = require('../schemas/distrito.schema');
const { crearDistrito, listarDistritos, cambiarDistrito, eliminarDistrito, seleccionarDistrito } = require('../services/distrito.service');
const { checkTokenBlack } = require('../middlewares/token-valid.handler');

const router = express.Router();

router.get('/',
    validationHandler(buscarDistritoSchema, 'query'),
    async (req, res, next) => {
        try {
            const respuesta = await listarDistritos(req?.query);
            res.status(200).json(respuesta);
        } catch(err) {
            next(err);
        }
    }
);

router.get('/:id',
    validationHandler(seleccionarDistritoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await seleccionarDistrito(id);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    validationHandler(crearDistritoSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const respuesta = await crearDistrito(body);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    checkTokenBlack(),
    validationHandler(seleccionarDistritoSchema, 'params'),
    validationHandler(cambiarDistritoSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const respuesta = await cambiarDistrito(id, body);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err)
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validationHandler(seleccionarDistritoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await eliminarDistrito(id);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;