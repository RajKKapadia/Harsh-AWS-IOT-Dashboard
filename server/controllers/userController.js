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
    let result = await UserModel.create(userBody);
    return res.status(200).json(result);
};

const updateUser = async (req, res) => {
    let id = req.params.id;
    let userUpdate = req.body;
    let result = await UserModel.findByIdAndUpdate(id, userUpdate);
    return res.status(200).json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser
};
