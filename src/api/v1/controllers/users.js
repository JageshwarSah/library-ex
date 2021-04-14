const User = require('../models/user')
const database = require('../services/database')

exports.createUser = database.createOne(User)
exports.updateUser = database.updateOne(User)
exports.getAllUsers = database.getAll(User)
exports.getUser = database.getOne(User)
exports.deleteUser = database.deleteOne(User)
