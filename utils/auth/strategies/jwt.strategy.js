const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const opciones = {
    //especificar donde van estar los tokens
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //firma de token para verificar si el token obtenido
    //es creado por este servicio
    secretOrKey: config.jwtSecret
};
//verifica el token y retorna el payload
const JwtStrategy = new Strategy(opciones, (payload, done) => {
    //si sucede un error retorna null
    //si no sucede un error retorna payload
    return done(null, payload);
});

module.exports = JwtStrategy;