const productModel = require('../../models/products.model')

exports.getAllProducts = async (req,res) =>{
    try{
        const {
            key, 
            sortBy, 
            orderBy,
            page
        } = req.query

        const products = await productModel.findAll(key, sortBy, orderBy, page)
        if(products.length < 1){
            throw Error('no_data')
        }
        const totalCount = await productModel.totalCount(key, sortBy, orderBy)

        return res.json({
            sucess: true,
            message: `List all products - ${totalCount} data found.`,
            results: products
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

exports.getDetailProduct = async (req, res) =>{
    const {id} = req.params
    const {columns} = req.query
    const selectedColumns = columns ? columns.split(',') : undefined
    try{
        const product = await productModel.findDetails(id, selectedColumns)
        if(product){
            return res.json({
                success: true,
                message: 'OK',
                results: product
            })
        }
        return res.status(404).json({
            success: false,
            message: 'product not found'
            })
    }catch(err){
        console.log(JSON.stringify(err))

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }

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
        if(err.code === "23502"){
            return res.status(400).json({
            success: false,
            message: `${err.column} Cannot be empty`
            })
        }
        
    }
}

exports.updateProduct = async (req, res) =>{
    const id = req.params.id
    try{
        const product = await productModel.updateProduct(id,req.body)
        
        if(product){
            return res.json({
                success: true,
                message: 'OK',
                results: product
            })
        }
        return res.status(404).json({
            success: false,
            message: 'product not found'
        })
    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        const product = await productModel.deleteProduct(id)
        if(product){
            return res.json({
                success: true,
                message: 'Delete success',
                results: product
            })
        }
        return res.status(404).json({
            success: false,
            message: 'product not found'
        })
    }catch(err){
        console.log(JSON.stringify(err))

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}