const express = require('express');
const passport = require('passport');
const { signToken, sendRecovery, changePassword, renewToken } = require('../services/auth.service');

const router = express.Router();

/*¿Por qué no esta el getUser aquí?
la estrategia passport local utiliza la función
getUser, por lo que verificar contraseña y email
ya se esta realizando no acá, sino en la estrategia
local que es declarado con passport.authenticate('local'*/

router.post('/login', 
    passport.authenticate('local', {session: false}), 
    async (req, res, next) => {
        try {
            const user = req.user;
            const respuesta = await signToken(user);
            res.json(respuesta);
        } catch(err) {
            next(err);
        }
    }
);

router.post('/recovery', async (req, res, next) => {
    try {
        const { email } = req.body;
        const respuesta = await sendRecovery(email);
        res.status(200).json(respuesta);
    } catch(err) {
        next(err);
    }
});

router.post('/change-password', async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const respuesta = await changePassword(token, newPassword);
        res.status(201).json(respuesta);
    } catch(err) {
        next(err);
    }
});

router.get('/renew-token',
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {
        try {
            const { sub } = req.user;
            const respuesta = await renewToken(sub);
            res.status(201).json(respuesta);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;