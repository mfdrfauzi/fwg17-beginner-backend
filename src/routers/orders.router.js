const ordersRouter = require('express').Router()

const ordersController = require('../controllers/orders.controller')

ordersRouter.get('/', ordersController.getAllOrders)
ordersRouter.get('/:id', ordersController.getDetailOrders)
ordersRouter.post('/', ordersController.createOrders)
ordersRouter.patch('/:id', ordersController.updateOrders)
ordersRouter.delete('/:id', ordersController.deleteOrders)

module.exports = ordersRouter