const messagesRouter = require('express').Router()

const messagesController = require('../controllers/messages.controller')

messagesRouter.get('/', messagesController.getAllMessages)
messagesRouter.get('/:id', messagesController.getDetailMessages)
messagesRouter.post('/', messagesController.createMessages)
messagesRouter.patch('/:id', messagesController.updateMessages)
messagesRouter.delete('/:id', messagesController.deleteMessages)

module.exports = messagesRouter