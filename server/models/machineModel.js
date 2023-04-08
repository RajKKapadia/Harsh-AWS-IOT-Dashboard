const mongoose = require('mongoose');
const { Schema } = mongoose;

const machineSchema = new Schema({
    machineId: String,
    name: String,
    maker: String,
    type: String,
    assigned: { type: Boolean, default: false },
    machineData: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
    clientId: String,
    endUserId: { type: String, default: '' }
});

module.exports = mongoose.model('machines', machineSchema);
