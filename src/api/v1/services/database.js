const mongoose = require('mongoose')
const ApiFeature = require('./apiFeature')
const ErrorHandler = require('./errorHandler')

exports.createOne = (Model, fields) => async (req, res, next) => {
  fields = { ...req.body }
  try {
    const newDoc = await Model.create(fields)

    res.status(201).json({
      data: newDoc,
    })
  } catch (err) {
    next(err)
  }
}

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const features = new ApiFeature(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const docs = await features.query
    res.status(200).json({
      results: docs.length,
      data: docs,
    })
  } catch (err) {
    next(err)
  }
}

exports.getOne = (Model, popOption) => async (req, res, next) => {
  try {
    const query = Model.findById(req.params.id)
    if (popOption) query.populate(popOption)

    const doc = await query

    if (!doc) throw new ErrorHandler('No document found', 404)

    res.status(200).json({
      data: doc,
    })
  } catch (err) {
    next(err)
  }
}

exports.updateOne = (Model) => async (req, res, next) => {
  const fields = { ...req.body }
  //TODO Find better method for updating
  try {
    let updatedDoc = await Model.findByIdAndUpdate(req.params.id, fields, {
      new: true,
    })

    if (!updatedDoc) throw new ErrorHandler('No document found', 404)

    res.status(200).json({
      data: updatedDoc,
    })
  } catch (err) {
    next(err)
  }
}

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    await Model.findByIdAndDelete(req.params.id)

    res.status(204).json({
      data: null,
    })
  } catch (err) {
    next(err)
  }
}
