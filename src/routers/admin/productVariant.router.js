const productVariantRouter = require('express').Router()

const productVariantController = require('../../controllers/admin/productVariant.controller')

productVariantRouter.get('/', productVariantController.getAllVariants)
productVariantRouter.get('/:id', productVariantController.getDetailVariant)
productVariantRouter.post('/', productVariantController.createVariant)
productVariantRouter.patch('/:id', productVariantController.updateVariant)
productVariantRouter.delete('/:id', productVariantController.deleteVariant)

module.exports = productVariantRouter