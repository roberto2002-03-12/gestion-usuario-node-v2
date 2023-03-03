const { getUserById, getUserByEmail, updateUser, activateUser, updateToken } = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');
const { getRoles } = require('../helpers/getRoles');
const { models } = require('../libs/sequelize');

const getUser = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) throw boom.unauthorized('No hay autenticación');
    
    if (user.dataValues.active == 0) throw boom.unauthorized('Usuario desactivado');

    const comprobar = await bcrypt.compare(password, user.password);

    if (!comprobar) throw boom.unauthorized('Contraseña incorrecta');

    delete user.dataValues.password;
    
    return user;
};

const signToken = async (user) => {
    //const rol = user?.rol[0]?.dataValues?.rolName
    const rol = [];
    
    for (i = 0; i < user?.rol.length; i++) {
        rol.push(user?.rol[i]?.dataValues?.rolName);
    };
    
    const payload = {
        sub: user.iduser,
        role: rol
    };

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '4h'});

    const userFound = await models.User.findByPk(user.iduser);

    await userFound.update({
        tokenLogged: token
    });

    return {
        user,
        token
    }
};

const sendMail = async (infoMail) => {
    //transporte para enviar mails
    const transporte = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: config.emailRecype,
            pass: config.passRecype
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    //enviar email con las opciones establecidas
    //en esas opciones esta el usuario y otras cosas
    await transporte.sendMail(infoMail);

    return { message: 'Email enviado' };
}

const sendRecovery = async (email) => {
    const user = await getUserByEmail(email);

    if (!user) throw boom.unauthorized('No hay autenticación');

    if (user.dataValues.active == 0) throw boom.unauthorized('Cuenta desactivada'); 
    
    const payload = {
        sub: user.iduser
    };
    //nuevo token con firma autentica y con tiempo de expiración de 15 min
    //esta pensado solamente en cambiar contraseña
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});

    //ToDo link de front end
    //const link = `http://myfrontend.com/recovery?token=${token}`;

    /*voy a guardar este token en la base de datos para luego
    cuando sea el momento de cambiar contraseña buscar este token
    y si existe entonces permitir al usuario en cambiar su contraseña*/
    const recovery = {
        recoveryToken: token
    };

    await updateUser(user.iduser, recovery);

    const emailInfo = {
        from: config.emailRecype, //el correo con la cual se va enviar
        to: `${user.email}`, //el correo donde se le va enviar
        subject: 'Email para recuperar la contraseña', //titulo de mensaje
        text: `este es el token para recuperar la contraseña: ${token}`, //texto de mensaje
        //html: `<b>Ingresa a este link para recuperar la contraseña => ${link}</b>` //diseño html si se desea
    };

    const respuesta = await sendMail(emailInfo); 
    return respuesta;
};

const changePassword = async (token, nuevaContrasena) => {
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        const user = await getUserById(payload.sub);
        
        if (user.recoveryToken !== token) throw boom.unauthorized('Token invalido');

        const hash = await bcrypt.hash(nuevaContrasena, 10);
        
        await updateUser(user.iduser, {
            recoveryToken: null,
            password: hash
        });

        return { message: 'Contraseña cambiada' };
    } catch(err) {
        throw boom.unauthorized('Tiempo expirado');
    }
};

const renewToken = async (sub) => {
    const user = await getUserById(sub);
    const roles = getRoles(user.dataValues.rol);

    const payload = {
        sub: sub,
        role: roles
    };

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '1h'});

    user.update({
        tokenLogged: token
    });

    return {
        user,
        token
    };
};

module.exports = {
    getUser,
    signToken,
    sendMail,
    sendRecovery,
    changePassword,
    renewToken
}