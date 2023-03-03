const Joi = require('joi');

const idperfil = Joi.number().integer();
const nombre = Joi.string().min(3);
const apellido = Joi.string().min(3);
const numCelular = Joi.number();
const foto = Joi.string().allow('').allow(null);
const fechaNacimiento = Joi.date();
const sexo = Joi.string().max(1);
const direccion = Joi.string();
const distritoId = Joi.number();
const ocupacionId = Joi.number();
const codigo = Joi.string().uuid();
const dni = Joi.number();

const email = Joi.string().email();
const password = Joi.string().min(8);

const createProfileSchema = Joi.object({
    nombre: nombre.required(),
    apellido: apellido.required(),
    numCelular: numCelular.required(),
    sexo: sexo.required(),
    dni: dni.required(),
    fechaNacimiento: fechaNacimiento.required(),
    direccion: direccion.optional(),
    user: Joi.object({
        email: email.required(),
        password: password.required()
    }),
    distritoId: distritoId.required(),
    ocupacionId: ocupacionId.optional(),
    foto: foto.optional(),
    codigo: codigo.required()
});

const updateProfileSchema = Joi.object({
    nombre: nombre.optional(),
    apellido: apellido.optional(),
    numCelular: numCelular.optional(),
    sexo: sexo.optional(),
    dni: dni.optional(),
    fechaNacimiento: fechaNacimiento.optional(),
    direccion: direccion.optional(),
    distritoId: distritoId.optional(),
    ocupacionId: ocupacionId.optional(),
    foto: foto.optional()
});

const getProfileSchema = Joi.object({
    id: idperfil.required()
});

module.exports = {
    updateProfileSchema,
    createProfileSchema,
    getProfileSchema
}