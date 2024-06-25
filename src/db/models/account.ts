interface Account {
    id: `${string}-${string}-${string}-${string}-${string}` // pk
    account: string // pk
    username: string // unique
    firstName: string
    lastName: string
    email: string // unique
    emailVerified: boolean
    companyId?: string
    companyName?: 'i2cat' | 'pied piper'
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
    password?: string
}

export default Account
