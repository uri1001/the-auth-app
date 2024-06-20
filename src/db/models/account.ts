interface Account {
    id: `${string}-${string}-${string}-${string}-${string}`
    username: string
    firstName: string
    lastName: string
    email: string
    emailVerified: boolean
    companyName: 'i2cat' | undefined
    companyId: string | undefined
    employeeId: string | undefined
    workplace: 'cybersecurity' | 'iot' | 'ai' | 'guest' | undefined
    role:
        | 'user'
        | 'admin'
        | 'business'
        | 'research'
        | 'manager'
        | 'operations'
        | 'technical'
        | undefined
    vcExpTimestamp: number | undefined
    password: string | undefined
}

export default Account
