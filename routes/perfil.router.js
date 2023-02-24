const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRole } = require('../middlewares/auth.handler');
const { createProfileSchema, getProfileSchema, updateProfileSchema } = require('../schemas/perfil.schema');
const { crearPerfil, getPerfiles, getPerfilById, updatePerfil, } = require('../services/perfil.service');
const fileUpload = require('../helpers/fileUpload');
const { getName } = require('../helpers/getNameFromUrl');
const validatorRegister = require('../helpers/validatorRegister');
const boom = require('@hapi/boom');
const { queryProfileSchema } = require('../schemas/query.schema');

const router = express.Router();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    checkRole('admin', 'manager'),
    validatorHandler(queryProfileSchema, 'query'),
    async (req, res, next) => {
    try {
        const perfiles = await getPerfiles(req?.query);
        res.status(200).json(perfiles);
    } catch (err) {
        next(err);
    }
});

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getProfileSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const perfil = await getPerfilById(id);
        res.status(200).json(perfil);
    } catch (err) {
        next(err);
    }
});

router.post('/',
    fileUpload.single("foto"),
    async (req, res, next) => {
    try {
        let objetoReparado = JSON.stringify(req.body);
        objetoReparado = JSON.parse(objetoReparado);
        objetoReparado.numCelular = parseInt(objetoReparado.numCelular);
        objetoReparado.dni = parseInt(objetoReparado.dni);

        const resultVal = validatorRegister(createProfileSchema, objetoReparado);

        if (resultVal === true) {
            const file = req.file?.location || 'empty';
            const fileName = getName(req.file?.location);
            const nuevoPerfil = await crearPerfil(objetoReparado, file, fileName);
            res.status(201).json(nuevoPerfil);
        } else {
            throw boom.badRequest(resultVal);
        }
    } catch (err) {
        next(err);
    }
});

router.put('/:id', 
    passport.authenticate('jwt', {session: false}),
    fileUpload.single("foto"),
    async (req, res, next) => {
    try {
        let objetoReparado = JSON.stringify(req.body);
        objetoReparado = JSON.parse(objetoReparado);

        if (objetoReparado.numCelular && objetoReparado.dni) {
            objetoReparado.numCelular = parseInt(objetoReparado.numCelular);
            objetoReparado.dni = parseInt(objetoReparado.dni);
        }

        const resultVal = validatorRegister(updateProfileSchema, objetoReparado);

        if (resultVal == true) {
            const { sub } = req.user;
            const { id } = req.params;
            const file = req.file?.location || 'empty';
            const fileName = getName(req.file?.location);
            const perfil = await updatePerfil(id, objetoReparado, sub, file, fileName);
            res.status(201).json(perfil); 
        } else {
            throw boom.badRequest(resultVal);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;