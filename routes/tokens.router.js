const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { listarListaInvalida, eliminarDeListaToken, agregarToken, buscarTokenId  } = require('../services/tokens.service');
const { checkRole } = require('../middlewares/auth.handler');
const { queryListarTokenSchema, buscarTokenIdSchema, registrarTokenSchema } = require('../schemas/token.schema');
const { checkTokenBlack } = require('../middlewares/token-valid.handler');

const router = express.Router();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validatorHandler(queryListarTokenSchema, 'query'),
    async (req, res, next) => {
        try {
            const lista = await listarListaInvalida(req?.query);
            res.status(200).json(lista);
        } catch(err) {  
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validatorHandler(registrarTokenSchema, 'body'),
    async (req, res, next) => {
        try {
            const { sub } = req.user;
            const respuesta = await agregarToken(req.body, sub);
            res.status(201).json(respuesta);
        } catch(err) {
            next(err);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validatorHandler(buscarTokenIdSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await buscarTokenId(id);
            res.status(200).json(respuesta);
        } catch(err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    checkTokenBlack(),
    validatorHandler(buscarTokenIdSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await eliminarDeListaToken(id);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;