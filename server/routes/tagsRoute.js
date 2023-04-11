const express = require('express');
const router = express.Router();

const { createOrUpdateTag, gettagsByMachineId } = require('../controllers/tagController');

router.post('/receive/:id', createOrUpdateTag);
router.get('/get/:id', gettagsByMachineId)

module.exports = {
    router
};
