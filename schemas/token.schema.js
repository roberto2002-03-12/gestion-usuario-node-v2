const Joi = require('joi');

const idtoken = Joi.number();
const iduser = Joi.number();
const addedBy = Joi.string().max(65);
const addedAt = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const limit = Joi.number().max(100);
const offset = Joi.number().min(0);

const queryListarTokenSchema = Joi.object({
    added_by: addedBy.optional(), 
    added_at: addedAt.optional(),
    limit: limit.optional(),
    offset: offset.optional()
});

const registrarTokenSchema = Joi.object({
    iduser: iduser.required()
});

const buscarTokenIdSchema = Joi.object({
    id: idtoken.required()
});

module.exports = {
    queryListarTokenSchema,
    registrarTokenSchema,
    buscarTokenIdSchema
};