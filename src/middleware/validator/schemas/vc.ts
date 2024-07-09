import { body, type ValidationChain } from 'express-validator'

const vcSchema: ValidationChain[] = [
    body('username')
        .isLength({ min: 1, max: 20 })
        .withMessage('username must be between 1 and 20 characters long')
        .isAlphanumeric()
        .withMessage('username must be alphanumeric')
        .custom(value => /^[A-Za-z]/.test(value))
        .withMessage('username must start with a letter'),

    body('first_name')
        .isLength({ min: 1, max: 40 })
        .withMessage('first name must be between 1 and 40 characters long')
        .isAlpha()
        .withMessage('first name must contain only alphabetic characters'),

    body('last_name')
        .isLength({ min: 1, max: 40 })
        .withMessage('last name must be between 1 and 40 characters long')
        .isAlpha()
        .withMessage('last name must contain only alphabetic characters'),

    body('email').isEmail().withMessage('invalid email address'),

    body('company_id')
        .optional()
        .isLength({ min: 1, max: 10 })
        .withMessage('company id must be between 1 and 10 characters long')
        .isNumeric()
        .withMessage('company id must be numeric'),

    body('company_name')
        .optional()
        .isIn(['i2CAT', 'pied piper'])
        .withMessage('company name must be either "i2CAT" or "pied piper"'),

    body('company_workplace')
        .optional()
        .isIn(['cybersecurity', 'iot', 'ai', 'guest'])
        .withMessage('company workplace must be one of "cybersecurity", "iot", "ai", or "guest"'),

    body('employee_id')
        .optional()
        .isLength({ min: 1, max: 10 })
        .withMessage('employee id must be between 1 and 10 characters long')
        .isNumeric()
        .withMessage('employee id must be numeric'),

    body('employee_role')
        .optional()
        .isIn(['user', 'admin', 'business', 'research', 'manager', 'operations', 'technical'])
        .withMessage(
            'employee role must be one of "user", "admin", "business", "research", "manager", "operations", or "technical"',
        ),
]

export default vcSchema
