//import package
//pendeklarasian variable express yang isi/valuenya adalah package express yang sudah di install
const express = require('express')

//deklarasi variable app yang value nya memanggil fungsi express yang berupa object
const app = express()

//penggunaan middleware bawaan dari express yang digunakan agar aplikasi express bisa memahami data yang di kirimkan oleh pengguna melalui body
app.use(express.urlencoded({extended: false}))


//
app.use('/', require('./src/routers'))

//request dengan method get dengan endpoint '/', menjalankan respon dengan objek json dengan berisi pesan bahwa backend berjalan dengan baik
app.get('/', (req, res) =>{
    return res.json({
        success: true,
        message: 'Backend is running well'
    })
})

//memonitor dan memberitahu bahwa aplikasi berjalan di port 8888, dan menunggu request dari endpoint
app.listen(8888, ()=>{
    console.log('App listening on port 8888')
})