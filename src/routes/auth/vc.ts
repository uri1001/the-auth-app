import express, { type Request, type Response } from 'express'
import fs from 'fs'
import passport from 'passport'
import path from 'path'

import { reqIssueDataVc } from '../../adapters/index.js'
import { validate, vcSchema } from '../../middleware/index.js'
import { AuthStrategies, loginUser, registerUser } from '../../services/index.js'

import { getEnv, rootPublic } from '../../system.js'

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

        // register successful authentication - user could be registered
        registerUser(AuthStrategies.VC, req)

        // login successful authentication
        loginUser(AuthStrategies.VC, req, res)

        res.redirect('/')
    },
)

// register
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', validate(vcSchema), async (req: Request, res: Response): Promise<void> => {
    // request vc issue data
    const base64Data: string = await reqIssueDataVc(req.body)

    // load the HTML template
    const template = fs.readFileSync(path.join(rootPublic, 'qr.html'), 'utf-8')

    // replace the placeholder with the base64 data
    const html = template.replace('{{qrImage}}', base64Data)

    // send the HTML content
    res.set('Content-Type', 'text/html').send(html)
})

export default router
