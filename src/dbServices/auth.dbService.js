const User = require('../models/user.model');

const authUpdate = async (id , data) => {
    return await User.findOneAndUpdate(id, data, { new: true });
}

const getSingleUserById = (id) => {
    return User.findById(id).select('-password -__v');  
}

const getSingleUser = (data) => {
    return User.findOne(data).select('-__v -verifyToken');
}

const getAllUser = (data) => {
    return User.find(data);
}

module.exports = { getSingleUserById, getSingleUser, getAllUser, authUpdate };