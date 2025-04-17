const User = require('../models/user.model');

const getSingleUserById = (id) => {
    return User.findById(id);
}

const getSingleUser = (data) => {
    return User.findOne(data);
}

const getAllUser = (data) => {
    return User.find(data);
}

module.exports = { getSingleUserById, getSingleUser, getAllUser }