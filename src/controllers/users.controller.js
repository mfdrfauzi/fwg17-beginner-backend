const userModel = require('../models/users.model')

//mendefinisikan fungsi getAllUsers untuk menampilkan semua users yang nantinya akan di export untuk digunakan oleh router
exports.getAllUsers = async (req,res) =>{
    const users = await userModel.findAll()
    //mengirimkan respon json yang berisi semua users dengan pesan 'List all users'
    return res.json({
        sucess: true,
        message: 'List all users',
        results: users
    })
}

//mendefinisikan fungsi getDetailUsers untuk menampilkan detail user yang nantinya akan di export untuk digunakan oleh router
exports.getDetailUser = async (req, res) =>{
    // mencari user dengan ID yang sesuai dalam array 'users' berdasarkan request dari parameter id yang bertipe integer
    // const user = users.filter(item => item.id === parseInt(req.params.id))
    const id = parseInt(req.params.id)
    const user = await userModel.findDetails(id)
    //memeriksa apakah user ditemukan melalui index dari array user
    if(!user){
        //jika user tidak ditemukan, akan mereturn respon json dengan status 404 dengan message 'User not found'
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    //mereturn respon json pada saat user ditemukan yang berisi pesan 'OK' dan menampilkan user berdasarkan index ke 0
    return res.json({
        success: true,
        message: 'OK',
        results: user
    })
}

//mendefinisikan fungsi createUser untuk membuat data user baru yang nantinya akan di export untuk digunakan oleh router
exports.createUser = async (req, res) =>{
    //mendestruct user name dari request body
    // const {name} = req.body
    //menambahkan 1 ke variable countUser untuk menghasilkan nilai id yang bertambah setiap user baru di buat
    // countUser = countUser + 1
    //mendeklarasikan variable user yang digunakan untuk membuat data user baru bertipe object
    // const user = {
        //id akan bertambah setiap user baru dibuat
        // id: countUser,
        //berisi nama user yang akan di buat
        // name 
    // }
    //menambahkan data user baru kedalam array users
    // users.push(user)
    try{
        const user = await userModel.insert(req.body)
        //mereturn respon json yang menyatakan keberhasilan pembuatan user dengan menampilkan pesan dan user yang telah di buat
        return res.json({
            success: true,
            message: 'Create user successfully',
            results: user
        })
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === "23502"){
            return res.status(400).json({
                success: false,
                message: `${err.column} Cannot be empty`
            })
        }
        //ada masalah, ${err.column} mereturn undefined
        if(err.code === "23505"){
            return res.status(400).json({
                success: false,
                message: `${err.column} Has been used. Try another`
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    
    }
}

//mendefinisikan fungsi updateUser untuk mengubah/memberbarui data user yang nantinya akan di export untuk digunakan oleh router
exports.updateUser = async (req, res) =>{
    //mendestruct id dari request params
    const id = req.params.id
    //mendestruct name dari request body
    const name = req.body.name
    //mencari index user dengan mapping yang sesuai dalam array 'users' dan ditampung dalam variable userId
    
    const user = await userModel.updateUser(id,name)
    
    //memeriksa apakan user dengan userId yang dicari ditemukan
    // if(userId === -1){
    if(!user){
        //jika tidak ditemukan, akan mereturn respon json 404 dengan pesan 'User not found'
        return res.status(404).json({
        success: false,
        message: 'User not found'
        })
    }
    //memperbarui nama user dalam users yang userId nya cocok, dengan nama yang baru
    // users[userId].name = name
    //mereturn respon json yang menyatakan keberhasilan pembaruan nama dengan pesan 'OK' dan menampulkan user yang idnya cocok
    return res.json({
        success: true,
        message: 'OK',
        // results: users[userId]
        results: user
    })
}

//mendefinisikan fungsi deleteUser untuk menghapus data user yang nantinya akan di export untuk digunakan oleh router
exports.deleteUser = async (req, res) => {
    //mendestruct id dari request params
    const id = parseInt(req.params.id)
    // mencari user dengan ID yang sesuai dalam array 'users' berdasarkan request dari parameter id yang bertipe integer
    // const user = users.filter(user => user.id === parseInt(id))
    const user = await userModel.deleteUser(id)
    //memeriksa apakah user ditemukan berdasarkan panjang/banyak nya user ketika sudah di filter
    if(!user){
        //jika tidak ditemukan, akan mereturn respon json 404 dengan pesan 'User not found'
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    //reassign users sehingga users berisi user yang tidak memiliki id yang sesuai dengan filter
    // users = users.filter(user => user.id !== parseInt(id))
    //mereturn respon json yang menyatakan kebehasilan penghapusan user dengan pesan 'Delete Success' dan data user yang dihapus
    return res.json({
        success: true,
        message: 'Delete success',
        results: user
    })
    
}