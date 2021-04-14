const router = require('express').Router()
const userController = require('../controllers/users')
const authController = require('../services/authorization')

// Puplic routes
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

// Protected Routes
router.use(authController.protect)

router.route('/update-password').post(authController.updatePassword)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)
router
  .route('/:id')
  .get(userController.getUser)
  .delete(authController.restrictTo('admin'), userController.deleteUser)
  .patch(userController.updateUser)

module.exports = router
