const catchAsyncErrors = require('./catchAsuncErrors')
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuthenticateuser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies

  //console.log(token)
  if (!token) {
    return next(new ErrorHandler('login first to access the resource', 401))
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decode.id)
  next()
})

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role (${req.user.role}) to access the resource`, 403)
      )
    }
    next()
  }
}
