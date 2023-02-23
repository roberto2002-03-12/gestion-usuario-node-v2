const Joi = require('joi');

const idDistrito = Joi.number();
const nombreDistrito = Joi.string().min(3).max(45);
const provinciaId = Joi.number();

const crearDistritoSchema = Joi.object({
    nombreDistrito: nombreDistrito.required(),
    provinciaId: provinciaId.optional()
});

const cambiarDistritoSchema = Joi.object({
    nombreDistrito: nombreDistrito.optional(),
    provinciaId: provinciaId.optional()
});

const seleccionarDistritoSchema = Joi.object({
    id: idDistrito.required()
});

const buscarDistritoSchema = Joi.object({
    nombre_distrito: nombreDistrito.optional()
});

module.exports = {
    crearDistritoSchema,
    seleccionarDistritoSchema,
    buscarDistritoSchema,
    cambiarDistritoSchema
}