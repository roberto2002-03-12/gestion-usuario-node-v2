const express = require('express');
const passport = require('passport');
const { checkRole } = require('../middlewares/auth.handler');
const validationHandler = require('../middlewares/validator.handler');
const { crearOcupacion, listarOcupacion, eliminarOcupacion, cambiarOcupacion, seleccionarOcupacion } = require('../services/ocupacion.service');
const { crearOcupacionSchema, buscarOcupacionSchema } = require('../schemas/ocupacion.schema');

const router = express.Router();

router.get('/',
    async (req, res, next) => {
        try {
            const trabajos = await listarOcupacion();
            res.status(200).json(trabajos);
        } catch(err) {
            next(err);
        }
    }
);

router.get('/:id',
    validationHandler(buscarOcupacionSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await seleccionarOcupacion(id);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validationHandler(buscarOcupacionSchema, 'params'),
    validationHandler(crearOcupacionSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const { id } = req.params;
            const respuesta = await cambiarOcupacion(id, body);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validationHandler(crearOcupacionSchema, 'body'),
    async (req, res, next) =>{
        try {
            const body = req.body;
            const respuesta = await crearOcupacion(body);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    validationHandler(buscarOcupacionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await eliminarOcupacion(id);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        } 
    }
);

module.exports = router;