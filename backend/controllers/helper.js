const jwt = require('jsonwebtoken');
const jwtSecret = 'vuejs_autzorg'

async function findAutzorgUser(knex, userData) {
  const user = await knex.table('users').where('autzorg_id', userData.id).first()
  if (user) {
    return user
  }

  const newUser = {
    autzorg_id: userData.id,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    phone: userData.phone,
    address: userData.address,
    dob: userData.dob,
    gender: userData.gender,
  }
  const [id] = await knex.table('users').insert(newUser)
  newUser.id = id

  return newUser
}

function generateToken(user) {
  return jwt.sign({user_id: user.id}, jwtSecret)
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret)
    if (decoded) {
      return decoded.user_id
    }
  } catch(e){}

  return null
}

module.exports = {
  generateToken,
  findAutzorgUser,
  verifyToken
}