import { randomBytes } from 'crypto'

export const jwtKey = randomBytes(16)
