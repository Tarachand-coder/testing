const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const validator = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) errorStatus(res, 404, 'Validation failed', errors.array());  
}

const successStatus = (res, data) => {
    if (Array.isArray(data)) var json = {status: "success", data: data};
    else json = {status: "success", message: data};

    return res.status(200).json(json);
}

const errorStatus = (res, statusCode, message, errors = '') => {
    if (errors) var json = {status: "error", message: message, errors: errors };
    else var json = {status: "error", message: message };
    
    return res.status(statusCode).json(json);
}

const hashedPassword = async (plainText) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(plainText, salt);
}

const rendomString = async () => {
    return await crypto.randomBytes(20).toString('hex');
}

module.exports = { validator, successStatus, errorStatus, hashedPassword, rendomString };