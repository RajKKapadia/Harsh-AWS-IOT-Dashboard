const express = require('express');
const router = express.Router();

const {
    getAllEndUsers,
    getEndUserById,
    createEndUser,
    updateEndUser,
    deleteEndUser
} = require('../controllers/endUserController');

router.get('/all', getAllEndUsers);
router.get('/one/:id', getEndUserById);
router.post('/create', createEndUser);
router.post('/update/:id', updateEndUser);
router.delete('/:id', deleteEndUser)

module.exports = {
    router
};
