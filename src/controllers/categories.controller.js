const categoriesModel = require('../models/categories.model')

exports.getAllCategories = async (req,res) =>{
    const categories = await categoriesModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all categories',
        results: categories
    })
}

exports.getDetailCategories = async (req, res) =>{
    const id = parseInt(req.params.id)
    const categories = await categoriesModel.findDetails(id)
    if(!categories){
        return res.status(404).json({
            success: false,
            message: 'categories not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: categories
    })
}

exports.createCategories = async (req, res) =>{
    try{
        const categories = await categoriesModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create categories successfully',
            results: categories
        })
    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateCategories = async (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    const categories = await categoriesModel.updateCategories(id,name)
    
    if(!categories){
        return res.status(404).json({
        success: false,
        message: 'categories not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: categories
    })
}

exports.deleteCategories = async (req, res) => {
    const id = parseInt(req.params.id)
    const categories = await categoriesModel.deleteCategories(id)
    if(!categories){
        return res.status(404).json({
            success: false,
            message: 'categories not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: categories
    })
    
}