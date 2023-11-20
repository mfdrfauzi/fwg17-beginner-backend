const productCategoriesRouter = require('express').Router()

const productCategoriesController = require('../controllers/productCategories.controller')

productCategoriesRouter.get('/', productCategoriesController.getAllProductCategories)
productCategoriesRouter.get('/:id', productCategoriesController.getDetailProductCategories)
productCategoriesRouter.post('/', productCategoriesController.createProductCategories)
productCategoriesRouter.patch('/:id', productCategoriesController.updateProductCategories)
productCategoriesRouter.delete('/:id', productCategoriesController.deleteProductCategories)

module.exports = productCategoriesRouter