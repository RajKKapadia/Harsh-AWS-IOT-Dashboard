const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    getCurrentUserProfile
} = require('../controllers/userController');
const { verifyAuth } = require('../utils/helper');

router.get('/all', getAllUsers);
router.get('/one/:id', getUserById);
router.post('/create', createUser);
router.post('/update/:id', updateUser);
router.get('/profile',verifyAuth, getCurrentUserProfile)

module.exports = {
    router
};
