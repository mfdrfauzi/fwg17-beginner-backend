const productSizeModel = require('../../models/productSize.model')

exports.getAllSize = async (req,res) =>{
    try{
        const { 
            sortBy, 
            orderBy,
            page
        } = req.query
        const size = await productSizeModel.findAll()
        if(size.length < 1){
            throw Error('no_data')
        }
        const totalCount = await productSizeModel.totalCount(sortBy,orderBy,page)
        return res.json({
            sucess: true,
            message: `List all size - ${totalCount} data found.`,
            results: size
        })
    }catch(err){
        if(err.message === 'no_data'){
            return res.status(404).json({
                success: false,
                messages: 'Data not found'
            })
        }
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
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