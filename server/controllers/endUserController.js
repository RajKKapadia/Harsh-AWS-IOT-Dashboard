const EndUserModel = require('../models/endUserModel');

const getAllEndUsers = async (req, res) => {
    let result = await EndUserModel.find({});
    return res.status(200).json(result);
};

const getEndUserById = async (req, res) => {
    let id = req.params.id;
    let result = await EndUserModel.findById(id);
    return res.status(200).json(result);
};

const createEndUser = async (req, res) => {
    let endUserBody = req.body;
    let result = await EndUserModel.create(endUserBody);
    return res.status(200).json(result);
};

const updateEndUser = async (req, res) => {
    let id = req.params.id;
    let endUserUpdate = req.body;
    let result = await EndUserModel.findByIdAndUpdate(id, endUserUpdate);
    return res.status(200).json(result);
};
const deleteEndUser = async (req, res) => {
  let id = req.params.id
  let result = await EndUserModel.findByIdAndDelete(id)
  return res.status(200).json(result)
}

module.exports = {
    getAllEndUsers,
    createEndUser,
    getEndUserById,
    updateEndUser,
    deleteEndUser
};
