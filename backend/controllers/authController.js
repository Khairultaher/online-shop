const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsuncErrors')
const sendToken = require('../utils/jwtToken')

// register user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: '123',
      url:
        'https://github.com/Khairultaher/online-shop/blob/main/resources/iphone-624709_960_720.jpg',
    },
  })

  sendToken(user, 200, res)

  //   const token = user.getJwtToken()
  //   res.status(201).json({
  //     success: true,
  //     user,
  //     token,
  //   })
})

// login user => /api/v1/login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorHandler('enter email & password', 404))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('invalid email & password', 401))
  }

  // confirm and compare password
  const passwordmatched = await user.comparePassword(password)
  if (!passwordmatched) {
    return next(new ErrorHandler('invalid password', 401))
  }

  sendToken(user, 200, res)
  //   const token = user.getJwtToken()
  //   res.status(200).json({
  //     success: true,
  //     token,
  //   })
})

// logout user =>  /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  req.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'logged out',
  })
})
