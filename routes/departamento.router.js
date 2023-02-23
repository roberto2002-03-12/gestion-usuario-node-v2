const express = require('express');
const passport = require('passport');
const { listarDepartamento, crearDepartamento, 
        eliminarDepartamento, cambiarDepartamento } = require('../services/departamento.service');
const { checkRole } = require('../middlewares/auth.handler');
const { createDepartamentoSchema, updateDepartamentoSchema,
        selectDepartamentoSchema, searchDepartamentoSchema } = require('../schemas/departamento.schema');
const validationHandler = require('../middlewares/validator.handler');

const router = express.Router();

router.post('/',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validationHandler(createDepartamentoSchema, 'body'),
    async (req, res, next) => {
        try {
            const departamento = req.body;
            const respuesta = await crearDepartamento(departamento);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/',
    validationHandler(searchDepartamentoSchema, 'query'),
    async (req, res, next) => {
        try {
            const departamentos = await listarDepartamento(req?.query);
            res.status(200).json(departamentos);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validationHandler(selectDepartamentoSchema, 'params'),
    validationHandler(updateDepartamentoSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const respuesta = await cambiarDepartamento(body, id);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validationHandler(selectDepartamentoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await eliminarDepartamento(id);
            res.status(200).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;