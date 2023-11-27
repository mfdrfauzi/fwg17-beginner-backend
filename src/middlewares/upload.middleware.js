const multer = require('multer')
const path = require('path')
const {v4: uuidv4} = require('uuid')

const storage = (dest, filename)=> multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads',dest))
    },
    filename: (req, file, cb) => {
        const extension = {
            'image/jpeg' : '.jpg',
            'image/png' : '.png',
        }

        filename = uuidv4()
        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})
const uploadMiddleware = (type, file) =>{
    const processUpload = multer({
        storage: storage(type, file),
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        fileFilter:(req, file, cb) =>{
            const extension = ['image/jpeg','image/png']
            if(!extension.includes(file.mimetype)){
                cb(new Error('extension_issue'), false)
            }else{
                cb(null, true)
            }
        }
    })
    return processUpload
}
module.exports = uploadMiddleware