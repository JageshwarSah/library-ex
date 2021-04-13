const router = require('express').Router()

const bookController = require('../controllers/books')

router
	.route('/')
	.post(bookController.createBook)
	.get(bookController.getAllBooks)

router
	.route('/:id')
	.get(bookController.getBook)
	.patch(bookController.updateBook)
	.delete(bookController.deleteBook)
module.exports = router
