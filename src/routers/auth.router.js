//deklarasi authRouter sebagai router dengan express
const authRouter = require('express').Router()

//mendeklarasikan authController untuk mengimport module/file 'auth.controller.js' yang mengatur proses authentification di folder '/src/controllers'
const authController = require('../controllers/auth.controller')

//menggunakan/memanggil router dengan fungsi login dalam module/file auth.controller yang menangani permintaan post di endpoint '/login' dari user untuk proses athentifitacion login
authRouter.post('/login', authController.login)

//mengkesport authRouter agar dapat digunakan di folder lain
module.exports = authRouter