const productTagsRouter = require('express').Router()

const productTagsController = require('../../controllers/admin/productTags.controller')

productTagsRouter.get('/', productTagsController.getAllProductTags)
productTagsRouter.get('/:id', productTagsController.getDetailProductTags)
productTagsRouter.post('/', productTagsController.createProductTags)
productTagsRouter.patch('/:id', productTagsController.updateProductTags)
productTagsRouter.delete('/:id', productTagsController.deleteProductTags)

module.exports = productTagsRouter