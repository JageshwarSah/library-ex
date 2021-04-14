const jwt = require('jsonwebtoken')

exports.create = (payload) => {
  const token = jwt.sign({ id: payload }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

exports.sendNew = (res, statusCode, payload) => {
  res.status(statusCode).json({
    token: this.create(payload),
  })
}
