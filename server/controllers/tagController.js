const TagModel = require('../models/tagModel');

const createOrUpdateTag = async (req, res) => {
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
};

module.exports = {
    createOrUpdateTag
};
