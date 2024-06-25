import express, { type Request, type Response } from 'express'
import passport from 'passport'

import { AuthStrategies, loginAccount, registerAccount } from '../../services/index.js'

const router = express.Router()

// login callback
router.get(
    '/cb',
    passport.authenticate('oauth', { failureRedirect: '/error', session: false }),
    (req: Request, res: Response): void => {
        if (req.user == null) throw new Error('request user undefined')

        // register successful authentication - account could be registered
        registerAccount(AuthStrategies.OAUTH, req.user)

        // login successful authentication
        loginAccount(AuthStrategies.OAUTH, req.user, res)

        res.redirect('/')
    },
)

export default router
