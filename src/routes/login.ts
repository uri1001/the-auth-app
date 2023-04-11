import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import path from 'path'

import { jwtKey } from '../middleware/passport'

import { type Account } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
    res.sendFile('public/login.html', { root: path.join(__dirname, '/../../') })
})

router.post(
    '/',
    passport.authenticate('username-password', { failureRedirect: '/login', session: false }),
    (req, res) => {
        if (req.user === undefined) throw new Error('request undefined')

        const account = req.user as Account

        const jwtClaims = {
            sub: account.username,
            iss: 'localhost:3000',
            aud: 'localhost:3000',
            exp: Math.floor(Date.now() / 1000) + 604800,
            role: 'user',
        }

        const token = jwt.sign(jwtClaims, jwtKey)

        res.cookie('auth-jwt', token, {
            httpOnly: true,
            secure: true,
        })
        res.json({ success: true, token: 'JWT ' + token })

        console.log(`Token sent. Debug at https://jwt.io/?value=${token}`)
        console.log(`Token secret (for verifying the signature): ${jwtKey.toString('base64')}`)

        res.end()
    },
)

export default router
