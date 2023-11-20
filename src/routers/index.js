//deklarasi variable router yang value nya adalah import object router dari express, gunanya untuk 
const router = require('express').Router()

//membuat router untuk endpoint '/auth', yang berguna ketika url berakhiran(endpoint) '/auth', prosesnya akan di atur oleh file auth.router.js di folder /src/routers
router.use('/auth', require('./auth.router'))
//membuat router untuk endpoint '/users', yang berguna ketika url berakhiran(endpoint) '/users', prosesnya akan di atur oleh file users.router.js di folder /src/routers
router.use('/users', require('./users.router'))
router.use('/products', require('./products.router'))
router.use('/product-size', require('./productSize.router'))
router.use('/product-variant', require('./productVariant.router'))
router.use('/tags', require('./tags.router'))
router.use('/product-tags', require('./productTags.router'))
router.use('/product-ratings', require('./productRatings.router'))
router.use('/categories', require('./categories.router'))
router.use('/product-categories', require('./productCategories.router'))
router.use('/promos', require('./promos.router'))
router.use('/orders', require('./orders.router'))
router.use('/order-details', require('./orderDetails.router'))
router.use('/messages', require('./messages.router'))


//export router agar dapat digunakan di file yang lain
module.exports = router 