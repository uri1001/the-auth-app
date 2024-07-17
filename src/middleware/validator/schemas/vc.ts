const vcSchema = {
    username: {
        in: ['body'],
        isLength: {
            options: { min: 1, max: 20 },
            errorMessage: 'username must be between 1 and 20 characters long',
        },
        isAlphanumeric: {
            errorMessage: 'username must be alphanumeric',
        },
        custom: {
            options: (value: string) => /^[A-Za-z]/.test(value),
            errorMessage: 'username must start with a letter',
        },
    },
    first_name: {
        in: ['body'],
        isLength: {
            options: { min: 1, max: 40 },
            errorMessage: 'first name must be between 1 and 40 characters long',
        },
        isAlpha: {
            errorMessage: 'first name must contain only alphabetic characters',
        },
    },
    last_name: {
        in: ['body'],
        isLength: {
            options: { min: 1, max: 40 },
            errorMessage: 'last name must be between 1 and 40 characters long',
        },
        isAlpha: {
            errorMessage: 'last name must contain only alphabetic characters',
        },
    },
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'invalid email address',
        },
        custom: {
            options: (value: string) => value.endsWith('@i2cat.net'),
            errorMessage: 'email must end with @i2cat.net',
        },
    },
    company_id: {
        in: ['body'],
        optional: true,
        isLength: {
            options: { min: 1, max: 10 },
            errorMessage: 'company id must be between 1 and 10 characters long',
        },
        isNumeric: {
            errorMessage: 'company id must be numeric',
        },
    },
    company_name: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [['i2CAT']],
            errorMessage: 'company name must be "i2CAT"',
        },
    },
    company_workplace: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [['cybersecurity', 'iot', 'ai', 'guest']],
            errorMessage:
                'company workplace must be one of "cybersecurity", "iot", "ai", or "guest"',
        },
    },
    employee_id: {
        in: ['body'],
        optional: true,
        isLength: {
            options: { min: 1, max: 10 },
            errorMessage: 'employee id must be between 1 and 10 characters long',
        },
        isNumeric: {
            errorMessage: 'employee id must be numeric',
        },
    },
    employee_role: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [
                ['user', 'admin', 'business', 'research', 'manager', 'operations', 'technical'],
            ],
            errorMessage:
                'employee role must be one of "user", "admin", "business", "research", "manager", "operations", or "technical"',
        },
    },
}

export default vcSchema
