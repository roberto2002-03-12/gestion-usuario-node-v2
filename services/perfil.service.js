require('dotenv').config();
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const { utilizarCodigo } = require('./codigo.service');
const { getUserByEmail } = require('./user.service');
const { User } = require('../db/models/user.model');
const aws = require('aws-sdk');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const s3 = new aws.S3();

const crearPerfil = async (data, file, fileName) => {
    const usuario = await getUserByEmail(data.user.email);

    if (usuario !== null) throw boom.unauthorized('Email ya registrado');

    await utilizarCodigo(data.codigo, data.user.email);

    const hash = await bcrypt.hash(data.user.password, 10);

    //modificar los datos
    const finalData = {
        ...data,
        foto: file,
        fotoNombre: fileName,
        user: {
            email: data.user.email,
            password: hash,
            active: 1
        }
    };
    //crear perfil y user al mismo tiempo
    const perfil = await models.Perfil.create(finalData, {
        include: ['user']
    });

    delete perfil.dataValues.user.dataValues.password;
    return perfil;
};

const getPerfiles = async (query) => {
    const opciones = {
        include: [
            {
                model: User,
                as: 'user',
                attributes: { //excluir contraseña para evitar usar map o forEach que hace mayor carga de proceso que una petición mysql
                    exclude: ['password', 'recoveryToken', 'token']
                },
                where: {}
            }
        ],
        where: {},
        limit: 5,
        offset: 0
    }

    const { limit, offset, nombre, correo, sexo, ocupacion, fecha_registro, orden } = query || {};

    if (nombre) {
        opciones.where = Sequelize.where(Sequelize.fn('concat', Sequelize.col('nombre'), ' ', Sequelize.col('apellido')), {
            [Op.like]: '%' + nombre + '%'
        })
    };

    if (correo) {
        opciones.include[0].where = {
            email: {
                [Op.like]: '%' + correo + '%'
            }
        }
    };

    if (fecha_registro) {
        let fecha = new Date(fecha_registro);
        opciones.include[0].where = Sequelize.and(opciones.include[0].where, { createdAt: {[Op.gte]: fecha} });
    }

    if (orden) {
        opciones.order = [[{model: User, as: 'user'},'createdAt', orden == 'mayor' ? 'ASC' : 'DESC']];
    }

    if (sexo) {
        opciones.where = Sequelize.and(opciones.where, { sexo: sexo });
    };

    if (ocupacion) {
        opciones.where = Sequelize.and(opciones.where, { ocupacion: ocupacion });
    };

    if (limit && offset) {
        opciones.limit = parseInt(limit);
        opciones.offset = parseInt(offset);
    };

    console.log(opciones);

    const perfiles = await models.Perfil.findAll(opciones);
    return perfiles;
};

const getPerfilById = async (id) => {
    const perfil = await models.Perfil.findByPk(id, {
        include: ['user']
    });
    if (!perfil) throw boom.notFound('Perfil no encontrado');
    delete perfil.dataValues.user.dataValues.password;
    return perfil;
};

const updatePerfil = async (id, datos, idtoken, file, fileName) => {
    const perfil = await models.Perfil.findByPk(id, {include: ['user']});

    if (!perfil) throw boom.notFound('Perfil no encontrado');

    if (perfil.dataValues.user.dataValues.iduser !== idtoken) throw boom.unauthorized('No puedes realizar cambios en otros perfiles');
    
    let new_img = '';
    let new_img_name = '';

    if (file !== 'empty') {
        new_img = file;
        new_img_name = fileName;
        try {
            let params = { Bucket: process.env.AWS_BUCKET_NAME, Key: perfil.dataValues.foto };
            await s3.deleteObject(params).promise();
        } catch(err) {
            console.log(err);
        }
    } else {
        new_img = perfil.dataValues.foto || 'empty';
        new_img_name = perfil.dataValues.fotoNombre || 'empty';
    }

    const newData = {
        ...datos,
        foto: new_img,
        fotoNombre: new_img_name
    }
    
    const respuesta = await perfil.update(newData);
    
    delete respuesta.dataValues.user;

    return respuesta;
};

module.exports = {
    crearPerfil,
    getPerfiles,
    getPerfilById,
    updatePerfil,
};