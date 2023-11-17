//deklarasi variable router yang value nya adalah import object router dari express, gunanya untuk 
const router = require('express').Router()

//membuat router untuk endpoint '/auth', yang berguna ketika url berakhiran(endpoint) '/auth', prosesnya akan di atur oleh file auth.router.js di folder /src/routers
router.use('/auth', require('./auth.router'))
//membuat router untuk endpoint '/users', yang berguna ketika url berakhiran(endpoint) '/users', prosesnya akan di atur oleh file users.router.js di folder /src/routers
router.use('/users', require('./users.router'))


//export router agar dapat digunakan di file yang lain
module.exports = router 