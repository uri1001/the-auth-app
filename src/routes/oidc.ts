import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import dotenv from 'dotenv'

import { randomUUID } from 'crypto'

import { jwtKey } from '../middleware/passport'

import { jsonDb } from '../db'

dotenv.config()

const router = express.Router()

router.get('/login', passport.authenticate('oidc', { scope: 'openid email profile' }))

router.get(
    '/cb',
    passport.authenticate('oidc', { failureRedirect: '/login', failureMessage: true }),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (req, res) => {
        if (req.user == null) throw new Error('undefined user openid authentication')

        console.log('OpenID Connect Received Request')
        console.log(req.user)
        console.log('*******************************')

        let id: `${string}-${string}-${string}-${string}-${string}` = randomUUID()
        let role: string = 'user'
        // @ts-expect-error types does not exist
        const username: string = req.user.email
        // @ts-expect-error types does not exist
        const email: string = req.user.email
        // @ts-expect-error types does not exist
        const emailVerifed: boolean = req.user.email_verifed
        // @ts-expect-error types does not exist
        const givenName: string = req.user.given_name
        // @ts-expect-error types does not exist
        const familyName: string = req.user.family_name

        // Check if user is registered
        try {
            const account: any = await jsonDb.getData(`/${username}`)
            id = account.id
            role = account.role
        } catch (error) {
            await jsonDb.push(`/${username}`, {
                id,
                username,
                role,
                email,
                email_verifed: emailVerifed,
                given_name: givenName,
                family_name: familyName,
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
            name: givenName,
            fam: familyName,
            iss: 'google',
            aud: 'localhost:3000',
            exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_SESSION_LENGTH_SECONDS),
        }

        const token = jwt.sign(jwtClaims, jwtKey)

        res.cookie('auth-jwt', token, {
            httpOnly: true,
            secure: true,
        })

        console.log(`Token sent. Debug at https://jwt.io/?value=${token}`)
        console.log(`Token secret (for verifying the signature): ${jwtKey.toString('base64')}\n`)

        // res.json({ success: true, token: 'JWT ' + token })
        res.redirect('/')

        res.end()
    },
)

export default router
