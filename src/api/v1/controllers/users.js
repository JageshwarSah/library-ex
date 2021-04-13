const User = require('../models/user')
const database = require('../services/database')

exports.createUser = database.createOne(User)
exports.getAllUsers = database.getAll(User)
exports.deleteUser = database.deleteOne(User)
