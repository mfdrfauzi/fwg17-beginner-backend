const userModel = require('../../models/users.model')
const argon = require('argon2')

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
        const totalCount = await userModel.totalCount(search, sortBy, orderBy)

        return res.json({
            sucess: true,
            message: `List all users - ${totalCount} data found.`,
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
    try{
        const user = await userModel.findDetails(id, selectedColumns)
        if(user){
            return res.json({
                success: true,
                message: 'OK',
                results: user
            })
        }
        return res.status(404).json({
            success: false,
            message: 'user not found'
        })
    }catch(err){
        console.log(JSON.stringify(err))

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

exports.createUser = async (req, res) =>{
    try{
        if(req.body.password){
            req.body.password = await argon.hash(req.body.password)
        }

        const user = await userModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create user successfully',
            results: user
        })
    }catch(err){
        if(err.code === "23502"){
            return res.status(400).json({
                success: false,
                message: `${err.column} Cannot be empty`
            })
        }
        console.log(JSON.stringify(err))
        if(err.code === "23505"){
            const errDetails = err.detail.match(/\((.*?)\)=\((.*?)\)/)
            const column = errDetails[1]
            
            return res.status(400).json({
                success: false,
                message: `${column} already exist.`
            })
        }
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    
    }
}

// exports.updatePassword = async (req, res) =>{
//     const id = req.params.id
//     try{
//         const user = await userModel.findDetails(id,['id','password'])

//         if(!user){
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             })
//         }

//         if(user.password.startsWith('$argon2')){
//             throw Error('hashed')
//         }

//         const hashedPassword = await argon.hash(user.password)
//         const updatedPassword = await userModel.updateUser(id,{password: hashedPassword})

//         return res.json({
//             success: true,
//             message: 'Update password successfully'
//         })
//     }catch(err){
//         if(err.message === 'hashed'){
//             return res.status(400).json({
//                 success: false,
//                 message: 'Password already hashed'
//             })
//         }
//         console.error(err)
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// }

exports.updateUser = async (req, res) =>{
    const id = req.params.id    
    try{
        const data = {
            ...req.body
        }

        if(req.body.password){
            data.password = await argon.hash(req.body.password)
        }

        const user = await userModel.updateUser(id,data)
        
        return res.json({
            success: true,
            message: 'Update user successfully',
            results: user
        })
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === "23505"){
            const errDetails = err.detail.match(/\((.*?)\)=\((.*?)\)/)
            const column = errDetails[1]
            
            return res.status(400).json({
                success: false,
                message: `${column} already exist.`
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    
    }
}

exports.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        const user = await userModel.deleteUser(id)
        if(user){
            return res.json({
                success: true,
                message: 'OK',
                results: user
            })
        }
        return res.status(404).json({
            success: false,
            message: 'user not found'
        })
    }catch(err){
        console.log(JSON.stringify(err))

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}