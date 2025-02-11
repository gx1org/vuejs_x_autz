const axios = require('axios');
const { findKunberUser, generateToken, verifyToken } = require('./helper');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

const login = async (req, res) => {
  const body = req.body
  const user = await knex.table('users').where('email', body.email).first()
  if (!user) {
    return res.send({message: 'User not found'})
  }

  if (user.password != body.password) {
    return res.send({message: 'Wrong password'})
  }

  const token = generateToken(user)
  return res.send({
    user,
    token
  })
}

const loginWithToken = async (req, res) => {
  const userId = verifyToken(req.body.token)
  if (!userId) {
    return res.status(401).send({message: 'Invalid token'})
  }

  const user = await knex.table('users').where('id', userId).first()
  if (!user) {
    return res.status(401).send({message: 'User not found'})
  }

  const token = generateToken(user)
  return res.send({
    user,
    token
  })
}

const authorize_kunber = async (req, res) => {
  const authCode = req.body.auth_code
  const appID = process.env.KUNBER_APP_ID
  const appSecret = process.env.KUNBER_APP_SECRET
  const userData = await axios.post(`https://kunber.zone.id/api/client/${appID}/exchange`, {
    code: authCode
  }, {
    headers: {
      Authorization: appSecret,
    }
  }).then(res => {
    return res.data.data
  }).catch(e => {
    console.error(e.response.data)
    return null
  })

  if (!userData) {
    return res.status(400).send({message: 'Invalid code'})
  }

  const user = await findKunberUser(knex, userData)
  const token = generateToken(user)
  return res.send({
    user,
    token
  })
}


module.exports = {
  login,
  loginWithToken,
  authorize_kunber,
}