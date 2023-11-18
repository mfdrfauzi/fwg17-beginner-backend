const productSizeModel = require('../models/productSize.model')

exports.getAllSize = async (req,res) =>{
    const size = await productSizeModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all size',
        results: size
    })
}

exports.getDetailSize = async (req, res) =>{
    const id = parseInt(req.params.id)
    const size = await productSizeModel.findDetails(id)
    if(!size){
        return res.status(404).json({
            success: false,
            message: 'size not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: size
    })
}

exports.createSize = async (req, res) =>{
    try{
        const size = await productSizeModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create size successfully',
            results: size
        })
    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateSize = async (req, res) =>{
    const id = req.params.id
    const size = req.body.size

    const updatedSize = await productSizeModel.updateSize(id,size)
    
    if(!size){
        return res.status(404).json({
        success: false,
        message: 'size not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: updatedSize
    })
}

exports.deleteSize = async (req, res) => {
    const id = parseInt(req.params.id)
    const size = await productSizeModel.deleteSize(id)
    if(!size){
        return res.status(404).json({
            success: false,
            message: 'size not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: size
    })
    
}