const productSizeRouter = require('express').Router()

const productSizeController = require('../controllers/productSize.controller')

productSizeRouter.get('/', productSizeController.getAllSize)
productSizeRouter.get('/:id', productSizeController.getDetailSize)
productSizeRouter.post('/', productSizeController.createSize)
productSizeRouter.patch('/:id', productSizeController.updateSize)
productSizeRouter.delete('/:id', productSizeController.deleteSize)

module.exports = productSizeRouter