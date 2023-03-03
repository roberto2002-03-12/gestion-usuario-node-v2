const Joi = require('joi');

const idcodigo = Joi.number();
const createdBy = Joi.string().max(65);
const createdAt = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const usedBy = Joi.string().max(65);
const usedAt = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const active = Joi.number().max(1).min(0);
const limit = Joi.number().max(100);
const offset = Joi.number().min(0);

const queryListarCodigosSchema = Joi.object({
    created_by: createdBy.optional(),
    created_at: createdAt.optional(),
    used_by: usedBy.optional(),
    used_at: usedAt.optional(),
    active: active.optional(),
    limit: limit.optional(),
    offset: offset.optional()
});

const buscarCodigoSchema = Joi.object({
    id: idcodigo
});

module.exports = {
    queryListarCodigosSchema,
    buscarCodigoSchema
};