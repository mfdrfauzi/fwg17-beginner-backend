const roleCheckMiddleware = (role)=>{ 
    return (req, res, next)=>{
        if (req.user.role !== role){
            return res.status(403).json({
                success: false,
                message: 'Forbidden access'
            })
        }
        next()
    }
}

module.exports = roleCheckMiddleware