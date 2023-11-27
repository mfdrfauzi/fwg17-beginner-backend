const productModel = require('../../models/products.model')
const fs = require('fs/promises')
const path = require('path')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('products').single('image')

exports.getAllProducts = async (req,res) =>{
    try{
        const {
            key, 
            sortBy, 
            orderBy,
            page = 1
        } = req.query

        const products = await productModel.findAll(key, sortBy, orderBy, page)
        if(products.length < 1){
            throw Error('no_data')
        }
        const totalCount = await productModel.totalCount(key, sortBy, orderBy)

        const totalPage = Math.ceil(totalCount / 10)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({
            sucess: true,
            message: `List all products`,
            pageInfo: {
                totalData: totalCount,
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage < totalPage ? nextPage : null,
                prevPage: prevPage > 1 ? prevPage : null 
            },
            results: products
        })
    }catch(err){
        if(err.message === 'no_data'){
            return res.status(404).json({
                success: false,
                messages: 'Data not found'
            })
        }
        console.log(err)
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
        console.log(product)
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
    upload(req, res, async (err)=>{
        try{
            if(err){
                throw err
            }
            if(req.file){
                req.body.image = req.file.filename
            }

            const product = await productModel.insert(req.body)

            return res.json({
                success: true,
                message: 'Create product successfully',
                results: product
            })  
        }catch(err){
            if(err.code === "23502"){
                return res.status(400).json({
                success: false,
                message: `${err.column} Cannot be empty`
                })
            }
            if(err.message === "File too large"){
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }
            if(err.message === 'extension_issue'){
                return res.status(400).json({
                    success: false,
                    message: 'File extension is not supported'
                    })
            }

            console.log(JSON.stringify(err))
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    })
}

exports.updateProduct = async (req, res) =>{
    const id = req.params.id
    const data = await productModel.findDetails(id)
    upload(req, res, async (err)=>{
        try{
            if(!data){
                throw new Error('not found')
            }

            if(err){
                throw err
            }

            if(req.file){
                if(data.image){
                    const uploadLocation = path.join(global.path, 'uploads', 'products', data.image)
                    fs.rm(uploadLocation)
                }
                req.body.image = req.file.filename
            }

            const product = await productModel.updateProduct(id,req.body)
            
            if(product){
                return res.json({
                    success: true,
                    message: 'Update Success',
                    results: product
                })
            }
        }catch(err){
            if(err.message ==='not found'){
                return res.status(404).json({
                    success: false,
                    message: 'product not found'
                })
            }
            if(err.message === "File too large"){
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }
            if(err.message === 'extension_issue'){
                return res.status(400).json({
                    success: false,
                    message: 'File extension is not supported'
                    })
            }

            console.log(JSON.stringify(err))
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    })
}

exports.deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        const product = await productModel.deleteProduct(id)
        if(!product){
            throw new Error('not found')
        }

        if(product.image){
            const uploadLocation = path.join(global.path, 'uploads', 'products', product.image)
                await fs.rm(uploadLocation)
        }
        return res.json({
            success: true,
            message: 'Delete success',
            results: product
        })
    }catch(err){
        if(err.message === 'not found'){
            return res.status(404).json({
                success: false,
                message: 'product not found'
            })
        }

        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}