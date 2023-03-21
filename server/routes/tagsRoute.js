const express = require('express');
const router = express.Router();

const { createOrUpdateTag } = require('../controllers/tagController');

router.post('/receive/:id', createOrUpdateTag);

module.exports = {
    router
};
