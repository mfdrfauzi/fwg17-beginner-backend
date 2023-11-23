const productTagsModel = require('../../models/productTags.model')

exports.getAllProductTags = async (req,res) =>{
    const productTags = await productTagsModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all productTags',
        results: productTags
    })
}

exports.getDetailProductTags = async (req, res) =>{
    const id = parseInt(req.params.id)
    const productTags = await productTagsModel.findDetails(id)
    if(!productTags){
        return res.status(404).json({
            success: false,
            message: 'productTags not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: productTags
    })
}

exports.createProductTags = async (req, res) =>{
    try{
        const productTags = await productTagsModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create productTags successfully',
            results: productTags
        })
    }catch(err){
        console.log(JSON.stringify(err))
        //mencoba membuat error jika tipe data yang dimasukan bukan integer, namun err.column mereturn undefined
        // if(err.code === "22P02"){
        //     return res.status(400).json({
        //         success: false,
        //         message: `${err.column} must be filled with an integer type. Please see the table for guidance`
        //     })
        // }else{
        //     return res.status(500).json({
        //         success: false,
        //         message: 'Internal Server Error'
        //     })
        // }
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateProductTags = async (req, res) =>{
    const id = req.params.id
    const productId = req.body.productId
    const tagId = req.body.tagId

    const updatedProductTags = await productTagsModel.updateProductTags(id,productId,tagId)
    
    if(!updatedProductTags){
        return res.status(404).json({
        success: false,
        message: 'tag not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: updatedProductTags
    })
}

exports.deleteProductTags = async (req, res) => {
    const id = parseInt(req.params.id)
    const tag = await productTagsModel.deleteProductTags(id)
    if(!tag){
        return res.status(404).json({
            success: false,
            message: 'tag not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: tag
    })
    
}