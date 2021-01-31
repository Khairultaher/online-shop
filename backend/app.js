const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/error')

app.use(express.json())
app.use(cookieParser())

// import all routes
const auth = require('./routes/authRoute')
const product = require('./routes/productRoute')
const order = require('./routes/orderRoute')

app.use('/api/v1', auth)
app.use('/api/v1', product)
app.use('/api/v1', order)

// middlewares to handle errors
app.use(errorMiddleware)

module.exports = app
