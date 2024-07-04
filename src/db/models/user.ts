interface User {
    id: `${string}-${string}-${string}-${string}-${string}` // ak
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
    id: 'user internal uuid [ string ] - ak',
    user: 'user key [ string ] - pk',
    username: 'user username [ string ] - uk',
    firstName: 'user first name [ string ]',
    lastName: 'user last name [ string ]',
    email: 'user electronic mail address [ string ] - uk',
    // @ts-expect-error invalid type
    emailVerified: 'user electronic email verified flag [ boolean ]',
    companyId: 'user company id [ string ]',
    // @ts-expect-error invalid type
    companyName: 'user company key [ i2CAT | pied piper ]',
    // @ts-expect-error invalid type
    companyWorkplace: 'user company official name [ cybersecurity | iot | ai | guest ]',
    employeeId: 'user company employee id [ string ]',
    // @ts-expect-error invalid type
    employeeRole:
        'user company employee role [ user | admin | business | research | manager | operations | technical ]',
    // @ts-expect-error invalid type
    vcExpirationTimestamp: 'user verifiable credential expiration timestamp in seconds [ number ]',
    password: 'user authentication hashed password - [ string ]',
}

export default User
