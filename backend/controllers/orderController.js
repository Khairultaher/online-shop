const Product = require('../models/product')
const Order = require('../models/order')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsuncErrors')
const ApiFeatures = require('../utils/apiFeatures')

// create new product
exports.addOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now,
    user: req.user._id,
  })
  res.status(201).json({
    success: true,
    order,
  })
})
// get all products
exports.getOrders = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 1
  const orderCount = await Order.countDocuments()
  const apiFeatures = new ApiFeatures(Order.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)
  const orders = await apiFeatures.query

  let totalAmount = 0
  orders.forEach((element) => {
    totalAmount += element.totalPrice
  })
  res.status(200).json({
    success: true,
    count: orders.length,
    orderCount,
    orders,
    totalAmount,
  })
})

// get loggged in user's order
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })

  if (!order) {
    return next(new ErrorHandler('order not found', 404))
  }

  res.status(200).json({
    success: true,
    orders,
  })
})

// get single product
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'email')

  if (!order) {
    return next(new ErrorHandler('order not found', 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

// update product
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  let order = await Order.findById(req.params.id)

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('already delivered', 404))
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity)
  })
  order.orderStatus = req.body.status
  order.deliveredAt = Date.now
  order.save()
  res.status(200).json({
    success: true,
    order,
  })
})

// delete product
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  let order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Order not found', 404))
    // return res.status(401).json({
    //   success: false,
    //   message: 'Product not found',
    // })
  }
  await order.remove()

  res.status(200).json({
    success: true,
    message: 'Order is deleted',
  })
})

async function updateStock(id, quantity) {
  const product = await Product.findById(id)
  product.stock = product.stock - quantity
  await product.save({validateBeforeSave: false})
}
