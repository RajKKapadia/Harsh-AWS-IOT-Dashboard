const UserModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    let result = await UserModel.find({});
    return res.status(200).json(result);
};

const getUserById = async (req, res) => {
    let id = req.params.id;
    let result = await UserModel.findById(id);
    return res.status(200).json(result);
};

const createUser = async (req, res) => {
    let userBody = req.body;
    const existingUser = await UserModel.findOne({
        email:req.body.email
    })  
    if(existingUser){
        return res.status(400).json({message:'User already exist'})
    }
    let result = await UserModel.create(userBody);
    return res.status(200).json(result);
};

const updateUser = async (req, res) => {
    let id = req.params.id;
    let userUpdate = req.body;
    let result = await UserModel.findByIdAndUpdate(id, userUpdate);
    return res.status(200).json(result);
};

const getCurrentUserProfile = async (req,res,next)=>{

    const { password, ...rest } = res.locals['userDetails']?.payload
    return res.json(rest)
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    getCurrentUserProfile
};
