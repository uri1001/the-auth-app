const pwdSchema = {
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
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'invalid email address',
        },
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 3 },
            errorMessage: 'password must be at least 3 characters long',
        },
    },
}

export default pwdSchema
