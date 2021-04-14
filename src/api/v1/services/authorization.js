const User = require('../models/user')
const jwt = require('jsonwebtoken')

const token = require('../helpers/accessToken')
const ErrorHandler = require('../services/errorHandler')

// const jwt = require('../helpers/jwt')

exports.signup = async (req, res, next) => {
  try {
    //TODO 1) Get Information
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })
    token.sendNew(res, 201, newUser.id)
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    // 1) Verify email and password
    const { email, password } = { ...req.body }
    if (!email || !password)
      throw new ErrorHandler('Please provide email and password', 400)
    const user = await User.findOne({ email })

    if (!user) throw new ErrorHandler('incorrect email or password', 400)

    // 2) Create and JWT
    token.sendNew(res, 200, user.id)
  } catch (err) {
    next(err)
  }
}

exports.protect = async (req, res, next) => {
  try {
    // 1) Get access token if present
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token)
      throw new ErrorHandler('You are not logged in, please login', 403)

    // 2) Verify and decode payload
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    // 3) Check if use is present with decoded id
    const currentUser = await User.findById(decoded.id)
    if (!currentUser)
      throw new ErrorHandler('User no longer exist in database', 404)

    // 4) Check if user has changed password after access token was issued
    if (currentUser.passwordChangedAfter(decoded.iat))
      throw new ErrorHandler('User has recently changed his password', 400)

    // 5) Grant Access
    req.user = currentUser
    next()
  } catch (err) {
    next(err)
  }
}

exports.restrictTo = (...roles) => (req, res, next) => {
  const userRole = req.user.role
  if (!roles.includes(userRole))
    next(new ErrorHandler('You are not authorized!', 403))

  next()
}

exports.updatePassword = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id)
    // Verify Current Password
  } catch (err) {
    next(err)
  }
}
