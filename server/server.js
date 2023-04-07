require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')
const connection = require('./config/connection.js');

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use(routes)

const PORT = process.env.PORT|| 3001

connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server Running on Port: http://localhost:${PORT}`)
  })
});