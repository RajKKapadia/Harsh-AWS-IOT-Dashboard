const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json(
        {
            token: 'abcd1234'
        }
    );
});

module.exports = {
    router
};
