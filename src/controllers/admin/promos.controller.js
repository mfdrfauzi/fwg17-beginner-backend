const promosModel = require('../../models/promos.model')

exports.getAllPromos = async (req,res) =>{
    const promos = await promosModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all promos',
        results: promos
    })
}

exports.getDetailPromos = async (req, res) =>{
    const id = parseInt(req.params.id)
    const promos = await promosModel.findDetails(id)
    if(!promos){
        return res.status(404).json({
            success: false,
            message: 'promos not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: promos
    })
}

exports.createPromos = async (req, res) =>{
    try{
        const promos = await promosModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create promos successfully',
            results: promos
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

exports.updatePromos = async (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    const promos = await promosModel.updatePromos(id,name)
    
    if(!promos){
        return res.status(404).json({
        success: false,
        message: 'promos not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: promos
    })
}

exports.deletePromos = async (req, res) => {
    const id = parseInt(req.params.id)
    const promos = await promosModel.deletePromos(id)
    if(!promos){
        return res.status(404).json({
            success: false,
            message: 'promos not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: promos
    })  
}