const express = require('express');
const router = express.Router();

const {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine
} = require('../controllers/machineController');

router.get('/all', getAllMachines);
router.get('/one/:id', getMachineById);
router.post('/create', createMachine);
router.post('/update/:id', updateMachine);

module.exports = {
    router
};
