const userRouter = require('express').Router()

const userController = require('../controllers/users.controller')

userRouter.get('/', userController)

module.exports = userRouter