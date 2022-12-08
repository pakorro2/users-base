//? LIbreria
const jwt = require('jsonwebtoken')

const checkUserCredential = require('./auth.controller')
const jwtSecret = require('../../config').api.jwtSecret

postLogin = (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    checkUserCredential(email, password)
      .then(data => {
        if (data) {
          //? Creacion del token con info del usuuario username, email e id
          const token = jwt.sign({
            user_name: data.user_name,
            id: data.id,
            role: data.role
          }, jwtSecret)
          res.status(200).json({ message: 'Correct credentials', token })
        } else {
          res.status(401).json({ message: 'Email or password is incorrect' })
        }
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  } else {
    res.status(400).json({ message: 'Missing data', fields: { email: 'example@example.com', password: 'string' } })
  }
}

module.exports = {
  postLogin
}