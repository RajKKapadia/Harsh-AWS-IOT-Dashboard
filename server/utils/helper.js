const jwt = require('jsonwebtoken')

const verifyAuth = (req,res,next)=>{
  const token = req.headers.authorization
  
 jwt.verify(token, process.env.JWT_KEY,(error,decoded)=>{
    if(error){
        return res.status(401).json({ message: 'Authorization failed' })
    }else{
      res.locals.userDetails = decoded
      next()
    }
  })

}

module.exports = {
  verifyAuth
}