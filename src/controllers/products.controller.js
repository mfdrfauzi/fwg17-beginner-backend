const productModel = require('../models/products.model')


exports.getAllProducts = async (req,res) =>{
    try{
        const {
            search, 
            sortBy, 
            orderBy,
            page = 1
        } = req.query

        const products = await productModel.findAll(search, sortBy, orderBy, page)
        if(products.length < 1){
            throw Error('no_data')
        }
        const totalCount = await productModel.totalCount(search, sortBy, orderBy)

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