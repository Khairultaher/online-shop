const express = require('express')
const router = express.Router()

const { isAuthenticateuser, authorizeRoles } = require('../middlewares/auth')

const {
  registerUser,
  login,
  logout,
  getUserProfile,
  updatePasword,
  updateProfile,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/authController')

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').post(logout)

router.route('/get').get(isAuthenticateuser, getAllUser)
router.route('/me').get(isAuthenticateuser, getUserProfile)
router.route('/updatepassword').put(isAuthenticateuser, updatePasword)
router.route('/updateprofile').put(isAuthenticateuser, updateProfile)

router
  .route('/admin/users')
  .get(isAuthenticateuser, authorizeRoles('admin'), getAllUser)

router
  .route('/admin/user/:id')
  .get(isAuthenticateuser, authorizeRoles('admin'), getUserById)

router
  .route('/admin/user/:id')
  .put(isAuthenticateuser, authorizeRoles('admin'), updateUser)

router
  .route('/admin/user/:id')
  .delete(isAuthenticateuser, authorizeRoles('admin'), deleteUser)

module.exports = router
