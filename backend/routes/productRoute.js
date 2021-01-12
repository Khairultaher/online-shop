const express = require('express')
const router = express.Router()

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

router.route('/products').get(getProducts)
router.route('/product/:id').get(getProductById)
router.route('/admin/product/add').post(addProduct)
router.route('/admin/product/:id').put(updateProduct)
router.route('/admin/product/:id').delete(deleteProduct)

module.exports = router
