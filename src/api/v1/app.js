const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const globalErrorHandler = require('./middlewares/globalErrorHandler')

// import routes
const bookRouter = require('./routes/books')
// express app
const app = express()

// Global Middlewares
// -- logger
app.use(morgan('dev'))

// --  set http security headers
app.use(helmet())
app.use(xss())

// body parser
app.use(express.json())
// Routes
app.use('/api/v1/books', bookRouter)
// unhandled routes
app.all('*', (req, res, next) => globalErrorHandler)

// -- global error handler
app.use(globalErrorHandler)

// export express app
module.exports = app
