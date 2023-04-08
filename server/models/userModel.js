const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('users', userSchema);
