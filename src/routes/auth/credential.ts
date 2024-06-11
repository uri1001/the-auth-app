import express from 'express'
import jwt from 'jsonwebtoken'
import QRCode from 'qrcode'

import dotenv from 'dotenv'

import { jwtKey } from '../../middleware/passport/index.js'

dotenv.config()

const router = express.Router()

router.get('/login', (_req, res) => {
    if (process.env.CREDENTIAL_PROVIDER_URL == null)
        throw new Error('undefined verifiable credentials login provider url')

    res.redirect(process.env.CREDENTIAL_PROVIDER_URL)
})

router.get('/jwt', (req, res) => {
    const token = req.query.token as string

    console.log(token)
    if (token == null) throw new Error('undefined jwt')

    try {
        const decoded = jwt.verify(token, jwtKey)
        console.log('Decoded JWT:', decoded)
    } catch (err) {
        res.status(401).send('invalid token')
    }

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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', async (req, res) => {
    console.log(req.body)
    // send req.body info
    // await for base64 qr code response

    try {
        const base64Message = 'dGhlLWF1dGhlbnRpY2F0aW9uLWFwcA=='

        const decodedMessage = Buffer.from(base64Message, 'base64').toString('utf-8')

        const qrCodeDataUrl: string = await QRCode.toDataURL(decodedMessage)

        const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Credential QR Code</title>
            </head>
            <body>
                <p><strong>Scan QR Code to Obtain Credential</strong></p>
                <img src="${qrCodeDataUrl}" alt="QR Code"/>
            </body>
        </html>
        `

        res.send(html)
    } catch (error) {
        res.status(500).send('Error generating QR code')
    }

    // register user to db on success

    res.end()
})

export default router
