const express = require('express')
const app = express()
app.use(express.json())

// import all routes
const products = require('./routes/productRoute')
app.use('/api/v1', products)

// middlewares to handle errors
const errorMiddleware = require('./middlewares/error')
app.use(errorMiddleware)

module.exports = app
