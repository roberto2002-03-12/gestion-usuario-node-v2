const Joi = require('joi');

const idDepartamento = Joi.number();
const nombreDepartamento = Joi.string().min(3).max(45);

const createDepartamentoSchema = Joi.object({
    nombreDepartamento: nombreDepartamento.required()
});

const updateDepartamentoSchema = Joi.object({
    nombreDepartamento: nombreDepartamento.required()
});

const selectDepartamentoSchema = Joi.object({
    id: idDepartamento.required()
});

const searchDepartamentoSchema = Joi.object({
    nombre_departamento: nombreDepartamento.optional()
});

module.exports = {
    createDepartamentoSchema,
    updateDepartamentoSchema,
    selectDepartamentoSchema,
    searchDepartamentoSchema
};