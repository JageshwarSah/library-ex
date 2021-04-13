const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	author: {
		type: String,
	},
	publisher: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
})

bookSchema.pre(/^find/, async function (next) {
	this.select('-__v')
	next()
})
module.exports = mongoose.model('Book', bookSchema)
