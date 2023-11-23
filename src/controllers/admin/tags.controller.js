const tagsModel = require('../../models/tags.model')

exports.getAllTags = async (req,res) =>{
    const tags = await tagsModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all tags',
        results: tags
    })
}

exports.getDetailTags = async (req, res) =>{
    const id = parseInt(req.params.id)
    const tags = await tagsModel.findDetails(id)
    if(!tags){
        return res.status(404).json({
            success: false,
            message: 'tags not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: tags
    })
}

exports.createTags = async (req, res) =>{
    try{
        const tags = await tagsModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create tags successfully',
            results: tags
        })
    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateTags = async (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    const tags = await tagsModel.updateTags(id,name)
    
    if(!tags){
        return res.status(404).json({
        success: false,
        message: 'tags not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: tags
    })
}

exports.deleteTags = async (req, res) => {
    const id = parseInt(req.params.id)
    const tags = await tagsModel.deleteTags(id)
    if(!tags){
        return res.status(404).json({
            success: false,
            message: 'tags not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: tags
    })
    
}