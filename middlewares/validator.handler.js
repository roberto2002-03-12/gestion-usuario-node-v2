const boom = require('@hapi/boom');

//schema: objeto Joi para validaciones
//property: especificación de donde se encuentra el objeto joi en el request

function validationHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];

        const { error } = schema.validate(data, { abortEarly: false });

        if (error) next(boom.badRequest(error));
        //continuar si no hay error
        next();
    };
};

module.exports = validationHandler;