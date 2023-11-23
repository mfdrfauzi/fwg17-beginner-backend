const productVariantModel = require('../../models/productVariant.model')

exports.getAllVariants = async (req,res) =>{
    const variants = await productVariantModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all variants',
        results: variants
    })
}

exports.getDetailVariant = async (req, res) =>{
    const id = parseInt(req.params.id)
    const variant = await productVariantModel.findDetails(id)
    if(!variant){
        return res.status(404).json({
            success: false,
            message: 'variant not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: variant
    })
}

exports.createVariant = async (req, res) =>{
    try{
        const variant = await productVariantModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create variant successfully',
            results: variant
        })
    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateVariant = async (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    const additionalPrice = req.body.additionalPrice

    const variant = await productVariantModel.updateVariant(id,name,additionalPrice)
    
    if(!variant){
        return res.status(404).json({
        success: false,
        message: 'variant not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: variant
    })
}

exports.deleteVariant = async (req, res) => {
    const id = parseInt(req.params.id)
    const variant = await productVariantModel.deleteVariant(id)
    if(!variant){
        return res.status(404).json({
            success: false,
            message: 'variant not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: variant
    })
    
}