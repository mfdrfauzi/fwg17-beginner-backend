const orderDetailsModel = require('../models/orderDetails.model')

exports.getAllOrderDetails = async (req,res) =>{
    const orderDetails = await orderDetailsModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all orderDetails',
        results: orderDetails
    })
}

exports.getDetailOrderDetails = async (req, res) =>{
    const id = parseInt(req.params.id)
    const orderDetails = await orderDetailsModel.findDetails(id)
    if(!orderDetails){
        return res.status(404).json({
            success: false,
            message: 'orderDetails not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: orderDetails
    })
}

exports.createOrderDetails = async (req, res) =>{
    try{
        const orderDetails = await orderDetailsModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create orderDetails successfully',
            results: orderDetails
        })
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === "23502"){
            return res.status(400).json({
                success: false,
                message: `${err.column} Cannot be empty`
            })
        }
        if(err.code === "22P02"){
            return res.status(400).json({
                success: false,
                message: `${err.column} must be filled with an integer type. Please see the table for guidance`
            })  
        }      
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateOrderDetails = async (req, res) =>{
    const id = req.params.id
    const variant = req.body.variant
    const size = req.body.size
    const orderDetails = await orderDetailsModel.updateOrderDetails(id,variant,size)
    
    if(!orderDetails){
        return res.status(404).json({
        success: false,
        message: 'orderDetails not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: orderDetails
    })
}

exports.deleteOrderDetails = async (req, res) => {
    const id = parseInt(req.params.id)
    const orderDetails = await orderDetailsModel.deleteOrderDetails(id)
    if(!orderDetails){
        return res.status(404).json({
            success: false,
            message: 'orderDetails not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: orderDetails
    })  
}