export interface Account {
    id: number
    username: string
    role: 'user' | 'admin'
    email: string
    emailVerified: boolean
    description: string
}
