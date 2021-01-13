const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    })
  }
  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err }
    error.message = err.message

    // wrong mongoose object id error
    if (err.name === 'CastError') {
      const message = `Resource not found. invalid: ${err.path}`
      error = new ErrorHandler(message, 400)
    }

    // handle mongose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.message).map((value) => value.message)
      error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
      success: false,
      message: err.message || 'Internal server error',
    })
  }
}
