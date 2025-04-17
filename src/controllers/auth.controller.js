const { registerService, loginService, profileService, logoutService, profileSaveService, forgotPasswordService, resetPasswordService, authResetPasswordService } = require('../services/auth.service');
const { validator, errorStatus, successStatus } = require('../helpers/helper');

const register = async (req, res) => {
    try {
        if (!validator(req, res)) {
            let result = await registerService(req);
            if (result) {
                successStatus(res, result);
            }
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error', error.message);
    }
}

const login = async (req, res) => {
    try {
        let result = await loginService(req, res);
        if (Array.isArray(result)) {
            successStatus(res, result);
        }else {
            errorStatus(res, 500, result);
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const profile = async (req, res) => {
    try {
        const result = await profileService(req);
        if (result) {
            successStatus(res, result);
        }else {
            errorStatus(res, 404, 'User not found');
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const logout = async (req, res) => {
    try {
        let result = await logoutService(req, res);
        if (result) {
            return successStatus(res, result);
        }else {
            errorStatus(res, 403, 'Token already blacklisted');
        }
    }catch (e) {
       errorStatus(res, 500, 'Internal server error');
    }
}

const profileSave = async (req, res) => {
    try {
        let result = await profileSaveService(req);
        if (result) {
            successStatus(res, result);
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const forgotPassword = async (req, res) => {
    try {
        if (!validator(req, res)) {
            let result = forgotPasswordService(req, res);
            if (result) {
                successStatus(res, 'Please check the mail for forgot password');
            }else {
                errorStatus(res, 403, 'Invalid email address');
            }
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const resetPassword = async (req, res) => {
    try {
        if (!validator(req)) {
            let result = await resetPasswordService(req);

            if (result == 200) successStatus(res, 'Password reset successfully');
            else if (result == 400) errorStatus(res, 401, 'Validation failed', { password: "Password and confirm password do not match" });
            else errorStatus(res, 400, 'Invalid URL or Token Expired');
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal Server Error', error.message);
    }
}

const authResetPassword = async (req, res) => {
    try {
        if (!validator(req, res)) {
            let result = await authResetPasswordService(req);

            if (result == 200) successStatus(res, 'Password reset successfully');
            else if (result == 401) errorStatus(res, 401, 'Validation failed', { password: "Password and confirm password do not match" });
            else errorStatus(res, 400, 'Old password is invalid');
        }
    }catch (error) {
        console.log(error.message);
        errorStatus(res, 500, 'Internal Server Error', error.message);
    }
}

module.exports = { register, login, profile, logout, profileSave, forgotPassword, resetPassword, authResetPassword };