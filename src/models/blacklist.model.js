const mongoose = require('mongoose');
const connectDB = require('../config/db');

connectDB();

const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
Blacklist = mongoose.model("blacklist", BlacklistSchema);

module.exports = Blacklist;