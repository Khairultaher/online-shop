const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

// handle uncaought error
process.on('uncaoughtException', (err) => {
  console.log(`ERROR: ${err.stack}`)
  console.log(`shuting down the server due to uncaought error`)
  process.exit(1)
})

// setting up config file
dotenv.config({ path: 'backend/config/config.env' })

// connect database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
})

// handle unhandel promis rejection errror
process.on('unhandleRejection', (err) => {
  console.log(`ERROR: ${err.message}`)
  console.log(`shuting down the server due to unhandle promise rejection error`)
  server.close(() => {
    process.exit(1)
  })
})
