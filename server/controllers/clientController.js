const ClientModel = require('../models/clientModel');
const UserModel = require('../models/userModel')

const getAllClients = async (req, res) => {
    let result = await ClientModel.find({});
    return res.status(200).json(result);
};

const getClientById = async (req, res) => {
    let id = req.params.id;
    let result = await ClientModel.findById(id);
    return res.status(200).json(result);
};

const createClient = async (req, res) => {
    let clientBody = req.body;
    let userBody = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:"CLIENT"
    }
    let result = await ClientModel.create(clientBody);
    let create_user_result = await UserModel.create(userBody)
    return res.status(200).json(result);
};

const updateClient = async (req, res) => {
    let id = req.params.id;
    let clientUpdate = req.body;
    let result = await ClientModel.findByIdAndUpdate(id, clientUpdate);
    return res.status(200).json(result);
};

const deleteClient = async (req, res) => {
  let id = req.params.id
  let result = await ClientModel.findByIdAndDelete(id)
  return res.status(200).json(result)
}

module.exports = {
    getAllClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient
};
