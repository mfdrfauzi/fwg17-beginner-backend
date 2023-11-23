//deklarasi variable usersRouter sebagai router dengan express
const userRouter = require('express').Router()

//mendeklarasikan usersController untuk mengimport module 'users.controller.js' yang mengatur segala proses mengenai users di folder '/src/controllers'
const userController = require('../../controllers/admin/users.controller')

//menggunakan/memanggil router dengan fungsi getAllUsers dalam module/file users.controller yang menangani permintaan get di endpoint '/' untuk melihat semua user
userRouter.get('/', userController.getAllUsers)

//menggunakan/memanggil router dengan fungsi getDetailUser dalam module/file users.controller yang menangani permintaan get di endpoint '/:id' dari user untuk melihat detail user
userRouter.get('/:id', userController.getDetailUser)

//menggunakan/memanggil router dengan fungsi createUser dalam module/file users.controller yang menangani permintaan post di endpoint '/' dari user/admin untuk membuat user baru
userRouter.post('/', userController.createUser)

//menggunakan/memanggil router dengan fungsi updateUser dalam module/file users.controller yang menangani permintaan patch di endpoint '/:id' dari user/admin untuk mengubah/memperbarui data user berdasarkan id
userRouter.patch('/:id', userController.updateUser)

//menggunakan/memanggil router dengan fungsi deleteUser dalam module/file users.controller yang menangani permintaan delete di endpoint '/:id' dari user/admin untuk menghapus data user berdasarkan id
userRouter.delete('/:id', userController.deleteUser)

//export modul userRouter agar bisa digunakan oleh file lain
module.exports = userRouter