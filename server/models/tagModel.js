const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        machineId: String,
        tag: String,
        data: { type: Array, default: [] },
        createdAt: { type: Date, default: Date.now() }
    }
);

module.exports = mongoose.model('tags', tagSchema);
