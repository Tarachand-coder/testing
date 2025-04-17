const connectDB = require('../config/db');
const mongoose = require('mongoose');

connectDB();
const Schema = mongoose.Schema;

const blanceSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    earning: {
        type: String,
        required: true,
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
const Blance = mongoose.model('Blance', blanceSchema);

module.exports = Blance;