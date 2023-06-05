import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import path from 'path'

import dotenv from 'dotenv'

import { jwtKey } from '../../middleware/passport'

import { type Account } from '../../types'

dotenv.config()

const router = express.Router()

router.get('/', (_req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, '../../..', 'public') })
})

router.post(
    '/',
    passport.authenticate('username-password', { failureRedirect: '/error', session: false }),
    (req, res) => {
        if (req.user === undefined) throw new Error('request undefined')

        const account = req.user as Account

        if (process.env.JWT_SESSION_LENGTH_SECONDS == null)
            throw new Error('undefined jwt session length')

        const jwtClaims = {
            jti: account.id,
            sub: account.username,
            role: account.role,
            email: account.email,
            email_verified: account.email_verified,
            iss: 'localhost:3000',
            aud: 'localhost:3000',
            exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_SESSION_LENGTH_SECONDS),
        }

        const token = jwt.sign(jwtClaims, jwtKey)

        res.cookie('auth-jwt', token, {
            httpOnly: true,
            secure: true,
        })

        console.log(`Token sent. Debug at https://jwt.io/?value=${token}`)
        console.log(`Token secret (for verifying the signature): ${jwtKey.toString('base64')}`)

        // res.json({ success: true, token: 'JWT ' + token })
        res.redirect('/')

        res.end()
    },
)

export default router
