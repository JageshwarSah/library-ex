const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name can not be empty'],
		},
		email: {
			type: String,
			required: [true, 'Please provide your email'],
			unique: [true, 'Email already registered!'],
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlenth: 8,
		},
		passwordConfirm: {
			type: String,
			required: true,
			validate: {
				validator: function (el) {
					return el === this.password
				},
				message: 'Password mismatch',
			},
		},
		profilePicture: {
			type: String,
			default: 'profile-default.jpg',
		},
		role: {
			type: String,
			enum: ['admin', 'teacher', 'parent', 'student', 'user'],
			default: 'user',
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
)
