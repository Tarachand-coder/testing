const connectDB = require('../config/db');
const mongoose = require('mongoose');

connectDB();

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expireDate: {
        type: Date,
        required: true
    }
   });
const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;