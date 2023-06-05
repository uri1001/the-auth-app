import axios from 'axios'
import express from 'express'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

import { randomUUID } from 'crypto'

import { jwtKey } from '../../middleware/passport'

import { jsonDb } from '../../db'

dotenv.config()

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/cb', async (req, res) => {
    const code = req.query.code
    if (code == null) {
        res.status(400)
        throw new Error('no code provided')
    }

    if (process.env.OAUTH2_TOKEN_URL == null) throw new Error('undefined oauth2 token endpoint')

    const tokenResponse = await axios.post(process.env.OAUTH2_TOKEN_URL, {
        client_id: process.env.OAUTH2_CLIENT_ID,
        client_secret: process.env.OAUTH2_CLIENT_SECRET,
        code,
    })

    console.log(`\n--- Token Response Data ---`)
    console.log(tokenResponse.data)

    const params = new URLSearchParams(tokenResponse.data)
    const accessToken = params.get('access_token')
    const scope = params.get('scope')

    if (scope !== 'user:email') {
        res.send('user did not consent to release email').status(401)
        throw new Error('user did not consent to release email')
    }

    if (process.env.USER_API == null) throw new Error('undefined user api endpoint')
    if (accessToken == null) throw new Error('undefined access token')

    const userDataResponse = await axios.get(process.env.USER_API, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    console.log(`\n--- User API Endpoint Response ---`)
    console.log(userDataResponse.data)

    let id: `${string}-${string}-${string}-${string}-${string}` = randomUUID()
    let role: string = 'user'
    const username: string = userDataResponse.data.login
    const email: string = userDataResponse.data.email

    // Check if user is registered
    try {
        const account: any = await jsonDb.getData(`/${username}`)
        id = account.id
        role = account.role
    } catch (error) {
        await jsonDb.push(`/${username}`, {
            id,
            username,
            role: userDataResponse.data.type.toLowerCase(),
            email,
            email_verified: false,
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
        iss: 'github',
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
})

export default router
