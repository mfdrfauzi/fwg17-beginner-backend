const productModel = require('../models/products.model')

exports.getAllProducts = async (req,res) =>{
    const products = await productModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all products',
        results: products
    })
}

exports.getDetailProduct = async (req, res) =>{
    const id = parseInt(req.params.id)
    const product = await productModel.findDetails(id)
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'product not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: product
    })
}

exports.createProduct = async (req, res) =>{
    try{
        const product = await productModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create product successfully',
            results: product
        })
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === "23502")
        return res.status(400).json({
            success: false,
            message: `${err.column} Cannot be empty`
        })
    }
}

exports.updateProduct = async (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    
    const product = await productModel.updateProduct(id,name)
    
    if(!product){
        return res.status(404).json({
        success: false,
        message: 'product not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: product
    })
}

exports.deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productModel.deleteProduct(id)
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'product not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: product
    })
    
}