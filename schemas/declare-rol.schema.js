const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const rolId = Joi.number().integer();
const assignedBy = Joi.string().max(65);
const createdAt = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const limit = Joi.number().max(100);
const offset = Joi.number().min(0);

const asignarRol = Joi.object({
    userId: userId.required(),
    rolId: rolId.required()
});

const buscarRol = Joi.object({
    id: id.required()
});

const queryRelacionesSchema = Joi.object({
    assigned_by: assignedBy.optional(),
    created_at: createdAt.optional(),
    limit: limit.optional(),
    offset: offset.optional()
});

module.exports = {
    asignarRol,
    buscarRol,
    queryRelacionesSchema
}