//import environment variables
require('dotenv').config({ path: './config.env' })

const mongoose = require('mongoose')

// handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
})

// import express app
const app = require('./src/api/v1/app')

// database initialization
const db = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD)
const database = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})

// server
const port = process.env.PORT || 5000

const server = app.listen(port, async () => {
  try {
    await database
    console.log(`App is running on port ${port}`)
  } catch (err) {
    console.log('Database connection failed!')
  }
})

// handle unhandled rejections
process.on('undhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('Shutting Down...')
  server.close(() => {
    process.exit(1)
  })
})
