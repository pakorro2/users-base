const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkUserCredential = async (email, password) => {
  try {
    const user = await findUserByEmail(email)
    const veryfyPassword = comparePassword(password, user.password)
    if (veryfyPassword) {
      return user
    }
    return null
  } catch (err) {
    return null
  }
}

module.exports = checkUserCredential