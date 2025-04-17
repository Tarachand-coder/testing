const { body } = require('express-validator');

const taskValidation = () => {
    return {
        task: [
            body('name').notEmpty().withMessage('Name is required')
            .isLength({ min: 5}).withMessage('Name must be at least 5 characters')
            .isLength({ max: 55}).withMessage('Name can not exceed 55 characters'),
            body('expire_date')
            .notEmpty().withMessage('Expiry date is required')
            .isISO8601().withMessage('Expiry date must be a valid date (YYYY-MM-DD)')
            .custom((value) => {
                const date = new Date(value);
                if (isNaN(date.getTime())) {
                    throw new Error('Expiry date must be a valid date');
                }
                return true;
            })
        ]
    }
}

module.exports = { taskValidation };