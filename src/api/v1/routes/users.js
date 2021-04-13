const router = require('express').Router()
const userController = require('../controllers/users')
const authController = require('../services/authorization')

// Puplic routes
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

router.route('/').get(authController.protect, userController.getAllUsers)

router.route('/:id').delete(userController.deleteUser)

module.exports = router
