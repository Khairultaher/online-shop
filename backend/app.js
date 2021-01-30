const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/error')

app.use(express.json())
app.use(cookieParser())

// import all routes
const products = require('./routes/productRoute')
const auth = require('./routes/authRoute')

app.use('/api/v1', products)
app.use('/api/v1', auth)

// middlewares to handle errors
app.use(errorMiddleware)

module.exports = app
