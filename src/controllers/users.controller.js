// inisialisasi array of object 'users' yang berisi id dan nama user
let users= [
    {
        id: 1,
        name: 'Leane Graham'
    },
    {
        id: 2,
        name: 'Clementine Dubuque'
    }
]

//mendekalarisak variable countUser sebagai panjang/banyaknya user
let countUser = users.length

//mendefinisikan fungsi getAllUsers untuk menampilkan semua users yang nantinya akan di export untuk digunakan oleh router
exports.getAllUsers = (req,res) =>{
    //mengirimkan respon json yang berisi semua users dengan pesan 'List all users'
    return res.json({
        sucess: true,
        message: 'List all users',
        results: users
    })
}

//mendefinisikan fungsi getDetailUsers untuk menampilkan detail user yang nantinya akan di export untuk digunakan oleh router
exports.getDetailUser = (req, res) =>{
    // mencari user dengan ID yang sesuai dalam array 'users' berdasarkan request dari parameter id yang bertipe integer
    const user = users.filter(item => item.id === parseInt(req.params.id))
    //memeriksa apakah user ditemukan melalui index dari array user
    if(!user[0]){
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
        results: user[0]
    })
}

//mendefinisikan fungsi createUser untuk membuat data user baru yang nantinya akan di export untuk digunakan oleh router
exports.createUser = (req, res) =>{
    //mendestruct user name dari request body
    const {name} = req.body
    //menambahkan 1 ke variable countUser untuk menghasilkan nilai id yang bertambah setiap user baru di buat
    countUser = countUser + 1
    //mendeklarasikan 
    const user = {
        id: countUser,
        name 
    }

    users.push(user)
    return res.json({
        success: true,
        message: 'Create user successfully',
        results: user
    })
}

exports.updateUser = (req, res) =>{
    const {id} = req.params
    const {name} = req.body
    const userId = users.map(user => user.id).indexOf(parseInt(id))
    if(userId === -1){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    users[userId].name = name
    return res.json({
        success: true,
        message: 'OK',
        results: users[userId]
    })
}

exports.deleteUser = (req, res) => {
    const {id} = req.params
    const user = users.filter(user => user.id === parseInt(id))
    if(!users.length){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    
    users = users.filter(user => user.id !== parseInt(id))
    return res.json({
        success: true,
        message: 'Delete success',
        results: user[0]
    })
    
}