const productRatingsModel = require('../../models/productRatings.model')

exports.getAllProductRatings = async (req,res) =>{
    const productRatings = await productRatingsModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all productRatings',
        results: productRatings
    })
}

exports.getDetailProductRatings = async (req, res) =>{
    const id = parseInt(req.params.id)
    const productRatings = await productRatingsModel.findDetails(id)
    if(!productRatings){
        return res.status(404).json({
            success: false,
            message: 'productRatings not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: productRatings
    })
}

exports.createProductRatings = async (req, res) =>{
    try{
        const productRatings = await productRatingsModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create productRatings successfully',
            results: productRatings
        })
    }catch(err){
        console.log(JSON.stringify(err))
        if(err.code === "22P02"){
            return res.status(400).json({
                success: false,
                message: `${err.column} must be filled with an integer type. Please see the table for guidance`
            })
        }
        if(err.code === "23514"){
            return res.status(400).json({
                success: false,
                message: `${err.column} only filled with 1-5`
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })    
    }
}

exports.updateProductRatings = async (req, res) =>{
    const id = req.params.id
    const rate = req.body.rate
    const reviewMessage = req.body.reviewMessage

    const updatedProductRatings = await productRatingsModel.updateProductRatings(id,rate,reviewMessage)
    
    if(!updatedProductRatings){
        return res.status(404).json({
        success: false,
        message: 'productRatings not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: updatedProductRatings
    })
}

exports.deleteProductRatings = async (req, res) => {
    const id = parseInt(req.params.id)
    const productRatings = await productRatingsModel.deleteProductRatings(id)
    if(!productRatings){
        return res.status(404).json({
            success: false,
            message: 'productRatings not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: productRatings
    })
    
}