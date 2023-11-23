const userModel = require('../models/users.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) =>{
    try{
        const {email, password} = req.body

        const user = await userModel.findOneByEmail(email)

        if(!user){
            throw Error('wrong')
        }

        const verify = await argon.verify(user.password, password)

        if(!verify){
            throw Error('wrong')
        }
        const payload = {
            id: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretkey')
        return res.json({
            success: true,
            messages: 'Login Success',
            results: {
                token
            }
        })
    }catch(err){
        if(err.message === 'wrong'){
            return res.status(401).json({
                success: false,
                messages: 'Wrong email or password'
            })
        }

    }
    // if(email=== "admin@mail.com" && password ==="1234"){
    //     return res.json({
    //         success: true,
    //         massage: 'Login success'
    //     })
    // }else{
    //     return res.json({
    //         success: false,
    //         message: 'Wrong username or password'
    //     })
    // }
}

exports.register = async (req, res) =>{
    try{
        const {fullName, email, password} = req.body
        const hashed = await argon.hash(password)
        const user = await userModel.insert({
            fullName,
            email,
            password: hashed
        })
        return res.json({
            success: true,
            message: 'Register sucessfully'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

exports.forgotPassword = async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOneByEmail(email)
        if (!password || password === '') {
            throw new Error ('Please insert the new password')
        }

        if(!user){
            throw new Error('Email is not registered')
        }

        const hashed = await argon.hash(password)
        const updatePassword = await userModel.updateUser(user.id,{password: hashed})

        return res.json({
            success: true,
            message: 'Update password successfully'
        })

    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(400).json({
            success: false,
            messages: err.message || 'Bad request'
        })
    }
}
