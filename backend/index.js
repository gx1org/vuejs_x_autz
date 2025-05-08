require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { login, authorize_autzorg, loginWithToken } = require('./controllers/user.controller')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('../frontend/dist'))

app.post('/api/login', login)
app.post('/api/loginbytoken', loginWithToken)
app.post('/api/authorize_autzorg', authorize_autzorg)

app.listen(3000, () => {
  console.log('Serving at http://localhost:3000');
})