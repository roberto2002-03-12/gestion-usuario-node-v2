const Joi = require('joi');
//valores para profile
const limit = Joi.number().max(20);
const offset = Joi.number().min(0);
const nombre = Joi.string().min(1);
const correo = Joi.string().min(1);
const sexo = Joi.string().max(1);
const ocupacion = Joi.string().min(4);
const fecha_registro = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
const orden = Joi.string().min(4).max(5)
//validador de profile query
const queryProfileSchema = Joi.object({
    limit: limit.optional(),
    offset: offset.optional(),
    nombre: nombre.optional(),
    correo: correo.optional(),
    sexo: sexo.optional(),
    ocupacion: ocupacion.optional(),
    fecha_registro: fecha_registro.optional(),
    orden: orden.optional()
});

module.exports = {
    queryProfileSchema,
};