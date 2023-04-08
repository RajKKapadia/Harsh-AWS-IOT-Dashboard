const express = require('express');
const { logInUser } = require('../controllers/loginController');

const router = express.Router();

router.post('/', logInUser);

module.exports = {
    router
};
