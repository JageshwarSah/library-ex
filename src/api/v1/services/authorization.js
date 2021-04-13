const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const jwt = require('../helpers/jwt')

exports.createToken = (payload) => {
  const token = jwt.sign({ id: payload }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

exports.sendNewToken = (res, payload) => {
  res.status(200).json({
    token: this.createToken(payload),
  })
}

exports.signup = async (req, res, next) => {
  try {
    //TODO 1) Get Information
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })
    this.sendNewToken(res, newUser.id)
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    // 1) Verify email and password
    const { email, password } = { ...req.body }
    if (!email || !password)
      throw new Error('Please provide email and password')
    const user = await User.findOne({ email })

    if (!user) throw new Error('Incorrect email or password')
    // 2) Create and JWT
    this.sendNewToken(res, user.id)
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

    if (!token) throw new Error('You are not logged in, please login')

    // 2) Verify and decode payload
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    console.log(decoded)
    // 3) Check if use is present with decoded id
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) throw new Error('User no longer exist in database')

    // 4) Check if user has changed password after access token was issued

    // 5) Grant Access
    req.user = currentUser
    next()
  } catch (err) {
    next(err)
  }
}
