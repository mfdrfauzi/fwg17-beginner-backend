const ordersModel = require('../../models/orders.model')

exports.getAllOrders = async (req,res) =>{
    const orders = await ordersModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all orders',
        results: orders
    })
}

exports.getDetailOrders = async (req, res) =>{
    const id = parseInt(req.params.id)
    const orders = await ordersModel.findDetails(id)
    if(!orders){
        return res.status(404).json({
            success: false,
            message: 'orders not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: orders
    })
}

exports.createOrders = async (req, res) =>{
    try{
        const orders = await ordersModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create orders successfully',
            results: orders
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

exports.updateOrders = async (req, res) =>{
    const id = req.params.id
    const totalByProductId = req.body.totalByProductId
    const address = req.body.address
    const orders = await ordersModel.updateOrders(id,totalByProductId,address)
    
    if(!orders){
        return res.status(404).json({
        success: false,
        message: 'orders not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: orders
    })
}

exports.deleteOrders = async (req, res) => {
    const id = parseInt(req.params.id)
    const orders = await ordersModel.deleteOrders(id)
    if(!orders){
        return res.status(404).json({
            success: false,
            message: 'orders not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: orders
    })  
}