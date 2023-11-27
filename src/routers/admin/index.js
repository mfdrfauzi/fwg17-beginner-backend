const adminRouter = require('express').Router()

adminRouter.use('/users', require('./users.router'))
adminRouter.use('/products', require('./products.router'))
adminRouter.use('/product-size', require('./productSize.router'))
adminRouter.use('/product-variant', require('./productVariant.router'))
adminRouter.use('/tags', require('./tags.router'))
adminRouter.use('/product-tags', require('./productTags.router'))
adminRouter.use('/product-ratings', require('./productRatings.router'))
adminRouter.use('/categories', require('./categories.router'))
adminRouter.use('/product-categories', require('./productCategories.router'))
adminRouter.use('/promos', require('./promos.router'))
adminRouter.use('/orders', require('./orders.router'))
adminRouter.use('/order-details', require('./orderDetails.router'))
adminRouter.use('/messages', require('./messages.router'))

module.exports = adminRouter 