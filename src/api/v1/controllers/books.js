const Book = require('../models/book')
const database = require('../services/database')

exports.createBook = database.createOne(Book)
exports.getAllBooks = database.getAll(Book)
exports.getBook = database.getOne(Book)
exports.updateBook = database.updateOne(Book)
exports.deleteBook = database.deleteOne(Book)
