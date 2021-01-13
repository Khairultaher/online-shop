const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsuncErrors')

// create new product
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})
// get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    count: products.lenghth,
    products,
  })
})

// get single product
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('product not found', 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

// update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('product not found', 404))
    // return res.status(401).json({
    //   success: false,
    //   message: 'Product not found',
    // })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    product,
  })
})

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('product not found', 404))
    // return res.status(401).json({
    //   success: false,
    //   message: 'Product not found',
    // })
  }
  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product is deleted',
  })
})
