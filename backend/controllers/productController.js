const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsuncErrors')
const ApiFeatures = require('../utils/apiFeatures')

// create new product
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})
// get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  //return next(new ErrorHandler('My Error', 400))

  const resPerPage = 8
  const productsCount = await Product.countDocuments()
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
  let products = await apiFeatures.query
  const filteredProductsCount = products.length
  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query

  res.status(200).json({
    success: true,
    productsCount,
    filteredProductsCount,
    resPerPage,
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

// new review => api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  let product = await Product.findById(productId)
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  )
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (r.user.toString() === req.user._id.toString()) {
        review.comment = comment
        review.rating = rating
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfreviews = product.reviews.length
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

  await product.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
    product,
  })
})

//  reviews => api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

//  delete review => api/v1/reviews
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  )

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

  const numOfreviews = product.reviews.length
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfreviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  res.status(200).json({
    success: true,
  })
})
