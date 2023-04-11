import express from 'express'
import path from 'path'

import scryptMcf from 'scrypt-mcf'

import { jsonDb } from '../db'

const router = express.Router()

const register = async (username: string, password: string, kdf: string): Promise<void> => {
    let pwdHash = ''

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

    await jsonDb.push(`/${username}`, { username, password: pwdHash })
}

router.get('/', (_req, res) => {
    res.sendFile('public/register.html', { root: path.join(__dirname, '/../../') })
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res) => {
    const { username, password, kdf } = req.body

    await register(username as string, password as string, kdf as string).catch(error => {
        console.log(error)
    })

    res.redirect('/login')
    res.end()
})

export default router
