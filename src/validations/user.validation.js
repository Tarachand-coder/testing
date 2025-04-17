const { body } = require('express-validator');
const User = require('../models/user.model');

const userValidation = () => {
    return {
        saveUser: [
            body('username').notEmpty().withMessage('Username is required')
            .isLength({min: 5}).withMessage('Username must be at least 5 characters')
            .isLength({max: 55}).withMessage('Username can not exceed 55 characters')
            .custom(async (value, { req }) => {
                const user = await User.findOne({ username: value });
                if (user) {
                    if (user.id !== req.body.id) { 
                        return Promise.reject('Email already in use');
                    }
                }
            }),
            body('email').notEmpty().withMessage('Email is required')
            .isLength({max: 55}).withMessage('Email can not exceed 55 characters')
            .isEmail().withMessage('Enter the valid email')
            .custom(async (value, { req }) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    if (user.id !== req.body.id) { 
                        return Promise.reject('Email already in use');
                    }
                }
            }),
            body('mobile_number').notEmpty().withMessage('Mobile number is required')
            .isNumeric().withMessage('Mobile number can be numeric')
            .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 number')
            .custom(async (value, { req }) => {
                const user = await User.findOne({ mobile_number: value });
                if (user) {
                    if (user.id !== req.body.id) { 
                        return Promise.reject('Mobile number already in use');
                    }
                }
            }),
            body('role').isLength({ max: 10}).withMessage('Role can be 10 characters'),
            body('status').notEmpty().withMessage('Status is required')
        ],
        setPassword: [
            body('password').notEmpty().withMessage('Password is required')
            .isLength({max: 55}).withMessage('Password can not exceed 55 characters'),
            body('confirm_password').notEmpty().withMessage('Confirm password is required')
            .isLength({max: 55}).withMessage('Confirm password can not exceed 55 characters')
        ],
        status: [
            body('id').notEmpty().withMessage('Id is required'),
            body('status').notEmpty().withMessage('Status is required')
            .isNumeric().withMessage('Status can be numeric')
        ]
    }
}

module.exports = { userValidation };