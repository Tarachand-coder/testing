const { getUsersService, saveUserService, deleteUserService, setPasswordService, changeStatusService, dbSeed } = require('../services/user.service');
const { validator, errorStatus, successStatus } = require('../helpers/helper');

const getUsers = async (req, res) => {
    try {
        let result = await getUsersService(req);
        if (result) {
            successStatus(res, result);
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const saveUser = async (req, res) => {
    try {
        if (!validator(req, res)) {
            let result = await saveUserService(req);
            if (result) {
                successStatus(res,  result);
            }
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error', error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        let result = await deleteUserService(req);
        if (result) {
            successStatus(res, result);
        }else {
            errorStatus(res, 404, 'User not found');
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const setPassword = async (req, res) => {
    try {
        if (!validator(req, res)) {
            let result = await setPasswordService(req);
            if (result == 200) {
                successStatus(res, 'Password set successfully');
            }else if (result == 401) {
                errorStatus(res, 401, 'Validation failed', { password : "password and confirm password does not match" });
            }else {
                errorStatus(res, 404, 'Invalid URL'); 
            }
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const changeStatus = async (req, res) => {
    try {
        if (!validator(req, res)) {
            let result = await changeStatusService(req);
            if (result) {
                successStatus(res, result);
            }else {
                errorStatus(res, 404, 'User not found');
            }
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const userSeed = async (req, res) => {
    try {
        let result = await dbSeed();
        if (result) successStatus(res, 'Database seed successfully');
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

module.exports = { getUsers, saveUser, deleteUser, setPassword, changeStatus, userSeed };