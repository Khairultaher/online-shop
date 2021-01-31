const express = require('express')
const router = express.Router()

const { isAuthenticateuser, authorizeRoles } = require('../middlewares/auth')

const {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
} = require('../controllers/orderController')

router
  .route('/admin/orders')
  .get(isAuthenticateuser, authorizeRoles('admin'), getOrders)
router.route('/order/:id').get(getOrderById)
router.route('/order/me').get(getMyOrders)
router.route('/order/add').post(isAuthenticateuser, addOrder)
router
  .route('/order/:id')
  .put(isAuthenticateuser, authorizeRoles('admin'), updateOrder)
router
  .route('/order/:id')
  .delete(isAuthenticateuser, authorizeRoles('admin'), deleteOrder)

module.exports = router
