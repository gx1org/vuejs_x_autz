require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { login, authorize_kunber, loginWithToken } = require('./controllers/user.controller')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('../frontend/dist'))

app.post('/api/login', login)
app.post('/api/loginbytoken', loginWithToken)
app.post('/api/authorize_kunber', authorize_kunber)

app.listen(3000, () => {
  console.log('Serving at http://localhost:3000');
})