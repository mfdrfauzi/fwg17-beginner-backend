//mengexport fungsi login sebagai bagian dari modul controller
exports.login = (req,res) =>{
    //mendestruct object dari request body untuk mendapatkan nilai username dan password
    const {username, password} = req.body
    //mengecek apabila username adalah "admin@mail.com" dan password adalah "1234"
    if(username=== "admin@mail.com" && password ==="1234"){
        //jika bernilai true, maka akn mereturn respon json yang berisi keberhasilan login
        return res.json({
            success: true,
            massage: 'Login success'
        })
    }else{
        //jika bernilai false, akan mereturn respon json yang berisi kegagalan login dengan pesan 'Wrong username or password'
        return res.json({
            success: false,
            message: 'Wrong username or password'
        })
    }
}