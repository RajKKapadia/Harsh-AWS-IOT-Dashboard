const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser
} = require('../controllers/userController');

router.get('/all', getAllUsers);
router.get('/one/:id', getUserById);
router.post('/create', createUser);
router.post('/update/:id', updateUser);

module.exports = {
    router
};
