import express from 'express'

import bcrypt from 'bcrypt'

import { randomUUID } from 'crypto'

import { jsonDb } from '../../db/index.js'
import root from '../system.js'

const router = express.Router()

const register = async (
    username: string,
    email: string,
    password: string,
    kdf: string,
): Promise<void> => {
    let pwdHash = ''

    console.log('Registration Username - ', username)
    console.log('Registration Email - ', email)
    console.log('Registration Password - ', password)
    console.log('KDF Option - ', kdf)

    if (await jsonDb.exists(`/${username}`)) throw new Error('username already exists')

    if (kdf === 'slow') {
        console.time('slow-key-derivation-function')
        const salt = bcrypt.genSaltSync(16)
        pwdHash = bcrypt.hashSync(password, salt)
        console.timeEnd('slow-key-derivation-function')
    } else {
        console.time('fast-key-derivation-function')
        const salt = bcrypt.genSaltSync(10)
        pwdHash = bcrypt.hashSync(password, salt)
        console.timeEnd('fast-key-derivation-function')
    }

    console.log('Password Hash - ', pwdHash)

    await jsonDb.push(`/${username}`, {
        id: randomUUID(),
        username,
        role: 'user',
        email,
        email_verified: false,
        description: '',
        password: pwdHash,
    })
}

router.get('/', (_req, res) => {
    res.sendFile('register.html', { root })
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res) => {
    const { username, email, password, kdf } = req.body

    try {
        await register(username as string, email as string, password as string, kdf as string)
        res.redirect('/login')
    } catch (error: any) {
        console.log(error)
        res.json(error.message)
    }
    res.end()
})

export default router
