const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const active = Joi.number().max(1); 

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
});

const passwordUpdateSchema = Joi.object({
    password: password.required(),
});

const getUserSchema = Joi.object({
    id: id.required()
});

const activeUserSchema = Joi.object({
    id: id.required(),
    active: active.required(),
});

const changePasswordSchema = Joi.object({
    password: password.required()
});

module.exports = {
    createUserSchema,
    passwordUpdateSchema,
    getUserSchema,
    activeUserSchema,
    changePasswordSchema
}