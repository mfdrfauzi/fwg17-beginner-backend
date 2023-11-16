exports.getAllUsers = (req,res) =>{
    return res.json({
        sucess: true,
        message: 'List all users',
        results: [
            {
                id: 1,
                name: 'Leanne Graham'
            },
            {
                id: 2,
                name: 'Bob'
            }
        ]
    })
}