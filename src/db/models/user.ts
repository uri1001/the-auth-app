interface User {
    id: string // ak
    user: string // pk
    username: string // unique
    firstName: string
    lastName: string
    email: string // unique
    emailVerified: boolean
    companyId?: string
    companyName?: 'i2CAT' | 'pied piper'
    companyWorkplace?: 'cybersecurity' | 'iot' | 'ai' | 'guest'
    employeeId?: string
    employeeRole?:
        | 'user'
        | 'admin'
        | 'business'
        | 'research'
        | 'manager'
        | 'operations'
        | 'technical'
    vcExpirationTimestamp?: number
    password?: string
}

export const userModel: User = {
    // @ts-expect-error invalid type
    id: {
        description: 'internal unique sha256 hash id - ak',
        format: 'hex sha256 digest output of the user object - string',
    },
    // @ts-expect-error invalid type
    user: {
        description: 'unique alphanumerical key - pk',
        format: 'more than 0 characters & less than 21, & must start with a letter with no special characters - string',
    },
    // @ts-expect-error invalid type
    username: {
        description: 'unique alphanumerical username - uk',
        format: 'more than 0 characters & less than 21 - string',
    },
    // @ts-expect-error invalid type
    firstName: {
        description: 'alphabetic first name',
        format: 'more than 0 characters & less than 41 - string',
    },
    // @ts-expect-error invalid type
    lastName: {
        description: 'alphabetic last name',
        format: 'more than 0 characters & less than 41 - string',
    },
    // @ts-expect-error invalid type
    email: {
        description: 'electronic mail address - uk',
        format: 'valid email address',
    },
    // @ts-expect-error invalid type
    emailVerified: {
        description: 'electronic email address verification flag',
        format: 'boolean',
    },
    // @ts-expect-error invalid type
    companyId: {
        description: 'unique numerical company id',
        format: 'more than 0 characters & less than 11 - string',
    },
    // @ts-expect-error invalid type
    companyName: {
        description: 'company unique alphanumerical key',
        format: 'i2CAT | pied piper',
    },
    // @ts-expect-error invalid type
    companyWorkplace: {
        description: 'company official name',
        format: 'cybersecurity | iot | ai | guest',
    },
    // @ts-expect-error invalid type
    employeeId: {
        description: 'unique numerical employee id',
        format: 'more than 0 characters & less than 11 - string',
    },
    // @ts-expect-error invalid type
    employeeRole: {
        description: 'company employee role',
        format: 'user | admin | business | research | manager | operations | technical',
    },
    // @ts-expect-error invalid type
    vcExpirationTimestamp: {
        description: 'verifiable credential expiration timestamp',
        format: 'natural integer in seconds - number',
    },
    // @ts-expect-error invalid type
    password: {
        description: 'authentication hashed password',
        format: 'hashed password - string',
    },
}

export default User
