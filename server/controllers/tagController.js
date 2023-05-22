const axios = require('axios');

const TagModel = require('../models/tagModel');

const createOrUpdateTag = async (req, res) => {

    if (req.body.hasOwnProperty('enableUrl')) {
        let options = {
            method: 'GET',
            url: req.body.enableUrl
        };
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        res.sendStatus(200);
    } else {
        let machineId = req.params.id;
        let tagBody = req.body;

        let tag = await TagModel.findOne({ tag: tagBody.tag, machineId: machineId });

        let result = {};

        if (!tag) {
            result = await TagModel.create(
                {
                    machineId: machineId,
                    tag: tagBody.tag,
                    data: [
                        tagBody.v
                    ]
                }
            );
        } else {
            result = await TagModel.findOneAndUpdate(
                {
                    tag: tagBody.tag, machineId: machineId
                },
                {
                    $push: { data: tagBody.v }
                }
            );
        }
        return res.status(200).json(result);
    }
};

const gettagsByMachineId = async (req, res) => {
    let machineId = req.params.id
    let tag = await TagModel.find({ machineId: machineId });
    return res.status(200).json(tag)
}

module.exports = {
    createOrUpdateTag,
    gettagsByMachineId
};
