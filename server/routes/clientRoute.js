const express = require('express');
const router = express.Router();

const { getAllClients, createClient, getClientById, updateClient, deleteClient } = require('../controllers/clientController')

router.get('/all', getAllClients)
router.get('/one/:id', getClientById)
router.post('/create', createClient)
router.post('/update/:id', updateClient)
router.delete('/:id',deleteClient)


module.exports = {
    router
};
