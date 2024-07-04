import * as crypto from 'crypto'

import { getEnv } from '../../system.js'

const key = Buffer.from(getEnv('DB_KEY'), 'base64') // AES-256 key
const iv = Buffer.from(getEnv('DB_IV'), 'base64') // Initialization vector

export const decrypt = (data: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

export const encrypt = (data: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}
