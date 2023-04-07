const express = require('express');
const router = express.Router();

const {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine,
    deleteMachine
} = require('../controllers/machineController');

router.get('/all', getAllMachines);
router.get('/one/:id', getMachineById);
router.post('/create', createMachine);
router.post('/update/:id', updateMachine);
router.delete('/:id',deleteMachine)
module.exports = {
    router
};
