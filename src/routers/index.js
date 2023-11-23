const router = require('express').Router()

const authMiddleware = require('../middlewares/auth.middleware')
const roleCheckMiddleware = require('../middlewares/roleCheck.middleware')

router.use('/auth', require('./auth.router'))
router.use('/admin',authMiddleware, roleCheckMiddleware('admin'), require('./admin'))

// router.use('/product-size', require('./productSize.router'))
// router.use('/product-variant', require('./productVariant.router'))
// router.use('/tags', require('./tags.router'))
// router.use('/product-tags', require('./productTags.router'))
// router.use('/product-ratings', require('./productRatings.router'))
// router.use('/categories', require('./categories.router'))
// router.use('/product-categories', require('./productCategories.router'))
// router.use('/promos', require('./promos.router'))
// router.use('/orders', require('./orders.router'))
// router.use('/order-details', require('./orderDetails.router'))
// router.use('/messages', require('./messages.router'))


module.exports = router 