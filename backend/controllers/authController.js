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

// get user profile  =>  /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

// get user profile  =>  /api/v1/me
exports.updatePasword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email }).select('+password')

  // confirm and compare password
  const passwordmatched = await user.comparePassword(req.body.password)
  if (!passwordmatched) {
    return next(new ErrorHandler('invalid password', 401))
  }

  sendToken(user, 200, res)
})

// get update profile  =>  /api/v1/me
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

// get user profile  =>  /api/v1/me
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

// get user profile  =>  /api/v1/me
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler(`user does not found ${req.params.id}`, 401))
  }
  res.status(200).json({
    success: true,
    user,
  })
})

// get update profile  =>  /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

// get user profile  =>  /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler(`user does not found ${req.params.id}`, 401))
  }

  await user.remove()

  res.status(200).json({
    success: true,
  })
})
