var mongoose = require('mongoose')

const MachineModel = require('../models/machineModel')
const ClientModel = require('../models/clientModel')

const getAllMachines = async (req, res) => {
  const userData = res.locals['userDetails']?.payload

  let clientId,result
  if ((userData?.role === 'CLIENT' || userData?.role === 'USER') && userData?._id) {
    clientId = userData?.clientId //mongoose.Types.ObjectId(userData?._id);
    result = await MachineModel.find({clientId:clientId })
  }else{
    result = await MachineModel.find({clientId:clientId })
  }

  
  return res.status(200).json(result)
}

const getMachineById = async (req, res) => {
  let id = req.params.id
  let result = await MachineModel.findById(id)
  return res.status(200).json(result)
}

const createMachine = async (req, res) => {
  let machineBody = req.body
  let result = await MachineModel.create(machineBody)
  await ClientModel.findByIdAndUpdate(machineBody.clientId, {
    $push: { machines: machineBody.machineId },
  })
  return res.status(200).json(result)
}

const updateMachine = async (req, res) => {
  let id = req.params.id
  let machineUpdate = req.body
  let result = await MachineModel.findByIdAndUpdate(id, machineUpdate)
  return res.status(200).json(result)
}

const deleteMachine = async (req, res) => {
  let id = req.params.id
  let result = await MachineModel.findByIdAndDelete(id)
  return res.status(200).json(result)
}

module.exports = {
  getAllMachines,
  createMachine,
  getMachineById,
  updateMachine,
  deleteMachine,
}
