//this is global error middleware override
module.exports = (err, req, res, next) => {
	res.status(err.status).json({ message: err.message })
}
