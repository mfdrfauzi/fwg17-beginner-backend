const userRouter = require('express').Router()


userRouter.use('/orders', require('./orders.router'))
userRouter.use('/orderDetails', require('./orderDetails.router'))

module.exports = userRouter