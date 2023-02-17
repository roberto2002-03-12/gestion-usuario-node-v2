const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const rolId = Joi.number().integer();

const asignarRol = Joi.object({
    userId: userId.required(),
    rolId: rolId.required()
});

const buscarRol = Joi.object({
    id: id.required()
});

module.exports = {
    asignarRol,
    buscarRol
}