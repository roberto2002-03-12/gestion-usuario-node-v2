const Joi = require('joi');

const idProvincia = Joi.number();
const nombreProvincia = Joi.string().min(3).max(45);
const departamentoId = Joi.number();

const crearProvinciaSchema = Joi.object({
    nombreProvincia: nombreProvincia.required(),
    departamentoId: departamentoId.optional()
});

const cambiarProvinciaSchema = Joi.object({
    nombreProvincia: nombreProvincia.optional(),
    departamentoId: departamentoId.optional()
})

const seleccionarProvinciaSchema = Joi.object({
    id: idProvincia.required()
});

const buscarProvinciaSchema = Joi.object({
    nombre_departamento: nombreProvincia.optional()
});

module.exports = {
    crearProvinciaSchema,
    seleccionarProvinciaSchema,
    buscarProvinciaSchema,
    cambiarProvinciaSchema
};