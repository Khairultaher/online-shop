exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'This routes will show all products from database',
  })
}
