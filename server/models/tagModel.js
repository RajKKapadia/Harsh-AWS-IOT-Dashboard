const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        machineId: String,
        tag: String,
        data: [],
        createdAt: { type: Date, default: Date.now() }   
    }
);

module.exports = mongoose.model('tags', tagSchema);
