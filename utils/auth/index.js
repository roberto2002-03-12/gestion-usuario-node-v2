const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

/*¿Cómo van a saber el tipo de estrategia?
cada estrategia a utilizado un passport diferente
el jwt a usado passport-jwt y el local a usado
passport-local, de esta manera va saber cual es
local y jwt*/

passport.use(LocalStrategy);
passport.use(JwtStrategy);