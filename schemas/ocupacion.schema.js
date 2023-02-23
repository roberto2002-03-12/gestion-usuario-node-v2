const Joi = require('joi');

const idOcupacion = Joi.number();
const nombreOcupacion = Joi.string().min(3).max(45);

const crearOcupacionSchema = Joi.object({
    nombreOcupacion: nombreOcupacion.required()
});

const buscarOcupacionSchema = Joi.object({
    id: idOcupacion.required()
});

module.exports = {
    crearOcupacionSchema,
    buscarOcupacionSchema
};