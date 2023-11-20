const productCategoriesModel = require('../models/productCategories.model')

exports.getAllProductCategories = async (req,res) =>{
    const productCategories = await productCategoriesModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all productCategories',
        results: productCategories
    })
}

exports.getDetailProductCategories = async (req, res) =>{
    const id = parseInt(req.params.id)
    const productCategories = await productCategoriesModel.findDetails(id)
    if(!productCategories){
        return res.status(404).json({
            success: false,
            message: 'productCategories not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: productCategories
    })
}

exports.createProductCategories = async (req, res) =>{
    try{
        const productCategories = await productCategoriesModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create productCategories successfully',
            results: productCategories
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
            message: 'Internal Server Error'
        })    
    }
}

exports.updateProductCategories = async (req, res) =>{
    const id = req.params.id
    const productId = req.body.productId
    const categoryId = req.body.categoryId

    const updatedProductCategories = await productCategoriesModel.updateProductCategories(id,productId,categoryId)
    
    if(!updatedProductCategories){
        return res.status(404).json({
        success: false,
        message: 'productCategories not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: updatedProductCategories
    })
}

exports.deleteProductCategories = async (req, res) => {
    const id = parseInt(req.params.id)
    const productCategories = await productCategoriesModel.deleteProductCategories(id)
    if(!productCategories){
        return res.status(404).json({
            success: false,
            message: 'productCategories not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: productCategories
    })
    
}