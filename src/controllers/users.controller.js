const userModel = require('../models/users.model')

exports.getAllUsers = async (req,res) =>{
    try{
        const {
            search, 
            sortBy, 
            orderBy,
            page
        } = req.query

        const users = await userModel.findAll(search, sortBy, orderBy, page)
        if(users.length < 1){
            throw Error('no_data')
        }
        const totalUsers = users[0].total_count

        return res.json({
            sucess: true,
            message: `List all users - ${totalUsers} data found.`,
            results: users
        })
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.message === 'no_data'){
            return res.status(404).json({
                success: false,
                messages: 'Data not found'
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })

    }
}

exports.getDetailUser = async (req, res) =>{
    const {id} = req.params
    const {columns} = req.query
    const selectedColumns = columns ? columns.split(',') : undefined
    const user = await userModel.findDetails(id, selectedColumns)
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'user not found'
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
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    
    }
}

exports.updateUser = async (req, res) =>{
    const id = req.params.id    
    const user = await userModel.updateUser(id,req.body)
    
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