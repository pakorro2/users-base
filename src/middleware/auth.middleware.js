//? Middleware para proteger rutas

//? Passport en este caso usaremos la estrategia de JWT para el manejo de login
const JwtStrategy = require('passport-jwt').Strategy;

//?Extraccion de los headers de la peticion
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const jwtSecret = require('../../config').api.jwtSecret
const { findUserById } = require('../users/users.controllers')


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtSecret
}

passport.use(
  new JwtStrategy(options, async (tokenDecoded, done) => {
    //? aqui obtendremos la respuesta
    try {
      const user = await findUserById(tokenDecoded.id)
      if (!user) {
        return done(null, false) //? Sin error pero no hay usuario
      }
      return done(null, tokenDecoded) //? Sin errores, hay usuario
    } catch (error) {
      return done(error, false) //? Hay error y no hay usuario
    }
  })
)

module.exports = passport