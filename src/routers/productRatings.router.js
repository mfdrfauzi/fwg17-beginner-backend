const productRatingsRouter = require('express').Router()

const productRatingsController = require('../controllers/productRatings.controller')

productRatingsRouter.get('/', productRatingsController.getAllProductRatings)
productRatingsRouter.get('/:id', productRatingsController.getDetailProductRatings)
productRatingsRouter.post('/', productRatingsController.createProductRatings)
productRatingsRouter.patch('/:id', productRatingsController.updateProductRatings)
productRatingsRouter.delete('/:id', productRatingsController.deleteProductRatings)

module.exports = productRatingsRouter