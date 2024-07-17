import * as crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import { getEnv, rootDb } from '../../system.js'

const key = Buffer.from(getEnv('DB_KEY'), 'base64') // AES-256 key
const iv = Buffer.from(getEnv('DB_IV'), 'base64') // Initialization vector

export const hash = (data: string): string =>
    crypto.createHash('sha256').update(String(data)).digest('hex')

export const encrypt = (data: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

export const decrypt = (data: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

export const encryptFileSync = (inputFile: string, outputFile: string): void => {
    const inputData = fs.readFileSync(path.join(rootDb, inputFile), 'utf8')
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encryptedData = cipher.update(inputData, 'utf8', 'hex')
    encryptedData += cipher.final('hex')
    fs.writeFileSync(path.join(rootDb, outputFile), encryptedData, 'utf8')
}

export const decryptFileSync = (inputFile: string, outputFile: string): void => {
    const encryptedData = fs.readFileSync(path.join(rootDb, inputFile), 'utf8')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8')
    decryptedData += decipher.final('utf8')
    fs.writeFileSync(path.join(rootDb, outputFile), decryptedData, 'utf8')
}
