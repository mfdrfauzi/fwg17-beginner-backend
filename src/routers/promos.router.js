const promosRouter = require('express').Router()

const promosController = require('../controllers/promos.controller')

promosRouter.get('/', promosController.getAllPromos)
promosRouter.get('/:id', promosController.getDetailPromos)
promosRouter.post('/', promosController.createPromos)
promosRouter.patch('/:id', promosController.updatePromos)
promosRouter.delete('/:id', promosController.deletePromos)

module.exports = promosRouter