//this is global error middleware override
module.exports = (err, req, res, next) => {
  res.status(500).json({
    err,
    message: err.message,
    stack: err.stack,
  })
}
