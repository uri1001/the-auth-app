import express from 'express'
import path from 'path'

import scryptMcf from 'scrypt-mcf'

import { randomUUID } from 'crypto'

import { jsonDb } from '../db'

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

    if (kdf === 'slow') {
        console.time('slow-key-derivation-function')
        pwdHash = await scryptMcf.hash(password, {
            derivedKeyLength: 64,
            scryptParams: { logN: 19, r: 8, p: 2 },
        })
        console.timeEnd('slow-key-derivation-function')
    } else {
        console.time('fast-key-derivation-function')
        pwdHash = await scryptMcf.hash(password)
        console.timeEnd('fast-key-derivation-function')
    }

    console.log('Password Hash - ', pwdHash)

    await jsonDb.push(`/${username}`, {
        id: randomUUID(),
        username,
        role: 'user',
        email,
        email_verifed: false,
        description: '',
        password: pwdHash,
    })
}

router.get('/', (_req, res) => {
    res.sendFile('register.html', { root: path.join(__dirname, '../..', 'public') })
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res) => {
    const { username, email, password, kdf } = req.body

    await register(username as string, email as string, password as string, kdf as string).catch(
        error => {
            console.log(error)
        },
    )

    res.redirect('/login')
    res.end()
})

export default router
