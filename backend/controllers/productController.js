const Product = require('../models/product')

// create new product
exports.addProduct = async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
}
// get all products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    count: products.lenghth,
    products,
  })
}

// get single product
exports.getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(401).json({
      success: false,
      message: 'Product not found',
    })
  }

  res.status(200).json({
    success: true,
    product,
  })
}

// update product
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(401).json({
      success: false,
      message: 'Product not found',
    })
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
}

// delete product
exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(401).json({
      success: false,
      message: 'Product not found',
    })
  }
  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product is deleted',
  })
}
