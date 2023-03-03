const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserById, activateUser, changePassword } = require('../services/user.service');
const { getUserSchema, activeUserSchema, changePasswordSchema } = require('../schemas/user.schema');
const { checkRole } = require('../middlewares/auth.handler');
const { checkTokenBlack } = require('../middlewares/token-valid.handler');

const router = express.Router();
//con session false evitas que guarde el usuario en la sesion
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validatorHandler(getUserSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const respuesta = await getUserById(id);
        res.status(200).json(respuesta)
    } catch(err) {
        next(err);
    }
});

router.patch('/desactivar-usuario', 
    passport.authenticate('jwt', {session: false}),
    checkRole('admin'),
    validatorHandler(activeUserSchema, 'body'),
    checkTokenBlack(),
    async (req, res, next) => {
    try {
        const { id, active } = req.body;
        const respuesta = await activateUser(id, active);
        res.status(201).json(respuesta);
    } catch(err) {
        next(err);
    }
});

router.put('/change-password/', 
    passport.authenticate('jwt', {session: false}),
    validatorHandler(changePasswordSchema, 'body'),
    async (req, res, next) => {
        try {
            const { sub } = req.user;
            const { password } = req.body;
            const respuesta = await changePassword(sub, password);
            res.status(201).json(respuesta);
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;