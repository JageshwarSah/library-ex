const { promisify } = require('util')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { token } = require('morgan')

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
    passwordChangedAt: Date,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

userSchema.pre('save', async function (next) {
  // TODO Before saving any user password changes
  // 1) Hash the password
  // 2) Set passwordChangedAt timestamp
  if (!this.isModified('password') || !this.isNew) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  this.passwordChangedAt = Date.now() - 1000

  next()
})

// userSchema.pre(/^find/, async function (next) {
//   // this.select('-__v')
//   next()
// })

userSchema.methods.passwordChangedAfter = function (tokenTimestamp) {
  const passswordTimestamp = parseInt(
    this.passwordChangedAt.getTime() / 1000,
    10
  )
  return tokenTimestamp < passswordTimestamp
}

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)
