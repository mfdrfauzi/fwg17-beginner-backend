const multer = require('multer')
const path = require('path')

const storage = (dest, filename)=> multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads',dest))
    },
    filename: (req, file, cb) => {
        const extension = {
            'image/jpeg' : '.jpg',
            'image/png' : '.png'
        }

        if(!filename && req.params.id){
            filename = req.params.id
        }else if(!filename){
            filename = new Date().getTime()
        }

        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})
const uploadMiddleware = (type, file) =>{
    const processUpload = multer({
        storage: storage(type, file)
    })
    return processUpload
}
module.exports = uploadMiddleware