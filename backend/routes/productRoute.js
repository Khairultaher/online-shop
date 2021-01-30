const express = require('express')
const router = express.Router()

const { isAuthenticateuser, authorizeRoles } = require('../middlewares/auth')

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

router.route('/products').get(isAuthenticateuser, getProducts)
router.route('/product/:id').get(getProductById)
router
  .route('/admin/product/add')
  .post(isAuthenticateuser, authorizeRoles('admin'), addProduct)
router
  .route('/admin/product/:id')
  .put(isAuthenticateuser, authorizeRoles('admin'), updateProduct)
router
  .route('/admin/product/:id')
  .delete(isAuthenticateuser, authorizeRoles('admin'), deleteProduct)

module.exports = router
