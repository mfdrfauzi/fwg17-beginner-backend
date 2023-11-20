const userModel = require('../models/users.model')

exports.getAllUsers = async (req,res) =>{
    const users = await userModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all users',
        results: users
    })
}

exports.getDetailUser = async (req, res) =>{
    const id = parseInt(req.params.id)
    const user = await userModel.findDetails(id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: user
    })
}

exports.createUser = async (req, res) =>{
    try{
        const user = await userModel.insert(req.body)
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

exports.updateUser = async (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    
    const user = await userModel.updateUser(id,name)
    
    if(!user){
        return res.status(404).json({
        success: false,
        message: 'User not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: user
    })
}

exports.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await userModel.deleteUser(id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: user
    })
    
}