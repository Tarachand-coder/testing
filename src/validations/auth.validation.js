const { body } = require('express-validator');
const User = require('../models/user.model');

const authValidation = () => {
    return {
        auth: [       
            body('username').notEmpty().withMessage('Username is required').isLength({ min: 5}).withMessage('Username must be at least 5 characters')
            .isLength({ max: 55}).withMessage('Username can not exceed 55 characters')
            .custom(async (value) => {
                try {
                    const user = await User.findOne({ username: value });
                    if (user) { 
                        return Promise.reject('Username already in use')
                    }
                }catch(error) {
                    return Promise.reject("Server error")
                }
            }),
            body('email').notEmpty().withMessage('Email is required').isLength({ max: 55}).withMessage('Email can not exceed 55 characters')
            .custom(async (value) => {
                try {
                    const user = await User.findOne({ email: value });
                    if (user) {
                        return Promise.reject('E-mail already in use');
                    }
                } catch (error) {
                    return Promise.reject('Server error');
                }
            }),
            body('password').notEmpty().withMessage('Password is required').isLength({ max: 55}).withMessage('Password can not exceed 55 characters')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[0-9]/).withMessage('Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
            body('mobile_number').notEmpty().withMessage('Mobile number is required').isNumeric().withMessage('Mobile number can not invalid') 
            .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 number')
            .custom(async (value) => {
                try {
                    const user = await User.findOne({ mobile_number: value });
                    if (user) { 
                        return Promise.reject('Mobile number already in use')
                    }
                }catch(error) {
                    return Promise.reject("Server error")
                }
            })
        ],
        forgotPassword: [
            body('email').notEmpty().withMessage('Email is required').isLength({ max: 55}).withMessage('Email can not exceed 55 characters')
        ],
        resetPassword: [
            body('password').notEmpty().withMessage('Password is required').isLength({ max: 55}).withMessage('Password can not exceed 55 characters'),
            body('confirm_password').notEmpty().withMessage('Confirm password is required').isLength({ max: 55}).withMessage('Confirm password can not exceed 55 characters')
        ],
        authresetPassword: [
            body('old_password').notEmpty().withMessage('Old password is required').isLength({ max: 55}).withMessage('Old password can not exceed 55 characters'),
            body('new_password').notEmpty().withMessage('New password is required').isLength({ max: 55}).withMessage('New password can not exceed 55 characters'),
            body('confirm_password').notEmpty().withMessage('Confirm password is required').isLength({ max: 55}).withMessage('Confirm password can not exceed 55 characters'),
        ]
    }
}

module.exports = { authValidation }