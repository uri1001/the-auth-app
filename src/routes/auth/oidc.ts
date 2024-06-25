import express, { type Request, type Response } from 'express'
import passport from 'passport'

import { AuthStrategies, loginAccount, registerAccount } from '../../services/index.js'

const router = express.Router()

// login
router.get('/login', passport.authenticate('oidc', { scope: 'openid email profile' }))

// login callback
router.get(
    '/cb',
    passport.authenticate('oidc', { failureRedirect: '/error', failureMessage: true }),
    (req: Request, res: Response): void => {
        if (req.user == null) throw new Error('request user undefined')

        // register successful authentication - account could be registered
        registerAccount(AuthStrategies.OIDC, req)

        // login successful authetication
        loginAccount(AuthStrategies.OIDC, req, res)

        res.redirect('/')
    },
)

export default router
