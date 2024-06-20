import express, { type Request, type Response } from 'express'
import passport from 'passport'
import QRCode from 'qrcode'

import { reqIssueDataVc } from '../../adapters/index.js'
import { AuthStrategies, loginAccount, registerAccount } from '../../services/index.js'

import { getEnv } from '../../system.js'

const router = express.Router()

// login
router.get('/login', (_req: Request, res: Response): void => {
    res.redirect(getEnv('VC_PROVIDER_LOGIN_URL'))
})

// login callback
router.get(
    '/cb',
    passport.authenticate('vc', { failureRedirect: '/error', session: false }),
    (req: Request, res: Response): void => {
        if (req.user == null) throw new Error('request user undefined')

        // register successful authentication - account could be registered
        registerAccount(AuthStrategies.VC, req)

        // login successful authentication
        loginAccount(AuthStrategies.VC, req, res)

        res.redirect('/')
    },
)

// register
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    // request vc issue data
    const base64Data: string = await reqIssueDataVc(
        getEnv('VC_PROVIDER_ISSUE_URL'),
        getEnv('VC_PROVIDER_ENDPOINT_AUTH_ID'),
        getEnv('VC_PROVIDER_ENDPOINT_AUTH_PWD'),
        req.body,
    )

    // format data - base64 to qr url
    const decodedMessage = Buffer.from(base64Data, 'base64').toString('utf-8')
    const qrCodeDataUrl: string = await QRCode.toDataURL(decodedMessage)

    // present data - qr code format
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
})

export default router
