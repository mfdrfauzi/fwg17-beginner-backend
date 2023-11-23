const adminRouter = require('express').Router()

adminRouter.use('/users', require('./users.router'))
adminRouter.use('/products', require('./products.router'))

module.exports = adminRouter 