const orderDetailsRouter = require('express').Router()

const orderDetailsController = require('../../controllers/user/orderDetails.controller')

orderDetailsRouter.get('/', orderDetailsController.getAllOrderDetails)
orderDetailsRouter.get('/:id', orderDetailsController.getDetailOrderDetails)
orderDetailsRouter.post('/', orderDetailsController.createOrderDetails)
orderDetailsRouter.patch('/:id', orderDetailsController.updateOrderDetails)
orderDetailsRouter.delete('/:id', orderDetailsController.deleteOrderDetails)

module.exports = orderDetailsRouter