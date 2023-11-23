const messagesModel = require('../../models/messages.model')

exports.getAllMessages = async (req,res) =>{
    const messages = await messagesModel.findAll()
    return res.json({
        sucess: true,
        message: 'List all messages',
        results: messages
    })
}

exports.getDetailMessages = async (req, res) =>{
    const id = parseInt(req.params.id)
    const messages = await messagesModel.findDetails(id)
    if(!messages){
        return res.status(404).json({
            success: false,
            message: 'messages not found'
        })
    }

    return res.json({
        success: true,
        message: 'OK',
        results: messages
    })
}

exports.createMessages = async (req, res) =>{
    try{
        const messages = await messagesModel.insert(req.body)
        return res.json({
            success: true,
            message: 'Create messages successfully',
            results: messages
        })
    }catch(err){
        console.log(JSON.stringify(err))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateMessages = async (req, res) =>{
    const id = req.params.id
    const receipentId = req.body.receipentId
    const senderId = req.body.senderId
    const messages = await messagesModel.updateMessages(id,receipentId,senderId)
    
    if(!messages){
        return res.status(404).json({
        success: false,
        message: 'messages not found'
        })
    }
    return res.json({
        success: true,
        message: 'OK',
        results: messages
    })
}

exports.deleteMessages = async (req, res) => {
    const id = parseInt(req.params.id)
    const messages = await messagesModel.deleteMessages(id)
    if(!messages){
        return res.status(404).json({
            success: false,
            message: 'messages not found'
        })
    }
    return res.json({
        success: true,
        message: 'Delete success',
        results: messages
    })
    
}