const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel')

const logInUser = async (req, res) => {
  let user = await UserModel.findOne({
    email:req.body.email
  })
  if(user){
    let token = jwt.sign({ payload: user }, process.env.JWT_KEY, {
      expiresIn: '24h', 
    })

   return res.status(200).json({
      token
    })
  }else{
    return res.status(400).json({message:'User not found'})
  }
  
}

module.exports = {
  logInUser
}