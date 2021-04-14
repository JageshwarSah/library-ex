module.exports = class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('5') ? 'error' : 'fail'
    this.isOperational = true
  }
}
