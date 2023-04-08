const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    name: String,
    companyName: String,
    email: String,
    phone: String,
    password: String,
    machines: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('clients', clientSchema);
