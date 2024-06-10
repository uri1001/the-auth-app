import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import { randomUUID } from 'crypto'

import dotenv from 'dotenv'

import { jwtKey } from '../../middleware/passport/index.js'

import { jsonDb } from '../../db/index.js'

dotenv.config()

const router = express.Router()

router.post(
    '/',
    passport.authenticate('local-radius', { failureRedirect: '/error', session: false }),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (req, res) => {
        if (req.user === undefined) throw new Error('request undefined')

        console.log('Radius Connect Received Request')
        console.log(req.user)
        console.log('*******************************')

        let id: `${string}-${string}-${string}-${string}-${string}` = randomUUID()
        let role: string = 'user'
        // @ts-expect-error types does not exist
        const username: string = req.user.username.substring(0, req.user.username.indexOf('@'))
        // @ts-expect-error types does not exist
        const email: string = req.user.username
        const emailVerifed: boolean = true

        // Check if user is registered
        try {
            const account: any = await jsonDb.getData(`/${username}`)
            id = account.id
            role = account.role
        } catch (error: any) {
            await jsonDb.push(`/${username}`, {
                id,
                username,
                role,
                email,
                email_verified: emailVerifed,
                given_name: '',
                family_name: '',
                description: '',
                password: null,
            })
        }

        if (process.env.JWT_SESSION_LENGTH_SECONDS == null)
            throw new Error('undefined jwt session length')

        const jwtClaims = {
            jti: id,
            sub: username,
            role,
            email,
            email_verified: true,
            iss: 'radius',
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
