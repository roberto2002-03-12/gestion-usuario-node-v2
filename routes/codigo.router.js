const express = require('express');
const passport = require('passport');
const { generarCodigo, listarCodigos, obtenerCodigo } = require('../services/codigo.service');
const { checkRole } = require('../middlewares/auth.handler');

const router = express.Router();

router.post('/generar-codigo',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    async (req, res, next) => {
        try {
            const { sub } = req.user;
            const codigo = await generarCodigo(sub);
            res.status(201).json(codigo);
        } catch (err) {
            next(err);
        }
    }    
);

router.get('/lista-codigos',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    async(req, res, next) => {
        try {
            const codigos = await listarCodigos();
            res.status(200).json(codigos);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/lista-codigos/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const codigo = await obtenerCodigo(id);
            res.status(200).json(codigo);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;