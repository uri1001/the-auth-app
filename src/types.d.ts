export interface Account {
    id: number
    username: string
    role: 'user' | 'admin'
    email: string
    email_verified: boolean
    description: string
}
