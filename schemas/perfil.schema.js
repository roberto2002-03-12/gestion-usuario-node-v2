const Joi = require('joi');

const idperfil = Joi.number().integer();
const nombre = Joi.string().min(3);
const apellido = Joi.string().min(3);
const numCelular = Joi.number();
const foto = Joi.string().allow('').allow(null);
const fechaNacimiento = Joi.date();
const sexo = Joi.string().max(1);
const ciudad = Joi.string();
const direccion = Joi.string();
const ocupacion = Joi.string();
const codigo = Joi.string().uuid();
const dni = Joi.number().min(8);

const email = Joi.string().email();
const password = Joi.string().min(8);

const createProfileSchema = Joi.object({
    nombre: nombre.required(),
    apellido: apellido.required(),
    numCelular: numCelular.required(),
    sexo: sexo.required(),
    dni: dni.required(),
    fechaNacimiento: fechaNacimiento.required(),
    ciudad: ciudad.required(),
    direccion: direccion.optional(),
    ocupacion: ocupacion.optional(),
    user: Joi.object({
        email: email.required(),
        password: password.required()
    }),
    foto: foto.optional(),
    codigo: codigo.required()
});

const getProfileSchema = Joi.object({
    id: idperfil.required()
});

module.exports = {
    createProfileSchema,
    getProfileSchema
}