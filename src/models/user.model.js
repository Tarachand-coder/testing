const connectDB = require('../config/db');
const mongoose = require('mongoose');

connectDB();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unquie: true
    },
    email: {
        type: String,
        required: false,
        unquie: true
    },
    password: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: String,
        required: false,
        unquie: true
    },
    profile_image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'user'
    },
    verifyToken:{
        type: String,
        required: false
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    isMail: {
        type: String,
        default: 0
    },
    status: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('Users', userSchema);

module.exports = User;