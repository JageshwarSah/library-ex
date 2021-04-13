const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const globalErrorHandler = require('./middlewares/globalErrorHandler')

// import routes
const bookRouter = require('./routes/books')
const userRouter = require('./routes/users')
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
app.use('/api/v1/users', userRouter)
// unhandled routes
app.all('*', (req, res, next) => globalErrorHandler)

// -- global error handler
app.use(globalErrorHandler)

// export express app
module.exports = app
