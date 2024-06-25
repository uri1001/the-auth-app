import express, { type Request, type Response } from 'express'
import passport from 'passport'

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
    const base64Data: string = await reqIssueDataVc(req.body)

    // decode base64 format into binary format
    const binaryData = Buffer.from(base64Data, 'base64')

    // present data - png file with qr code
    res.set('Content-Type', 'image/png').send(binaryData)
})

export default router
