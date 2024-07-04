import express, { type Request, type Response } from 'express'
import passport from 'passport'

import { AuthStrategies, loginUser, registerUser } from '../../services/index.js'

const router = express.Router()

// login callback
router.get(
    '/cb',
    passport.authenticate('oauth', { failureRedirect: '/error', session: false }),
    (req: Request, res: Response): void => {
        if (req.user == null) throw new Error('request user undefined')

        // register successful authentication - user could be registered
        registerUser(AuthStrategies.OAUTH, req.user)

        // login successful authentication
        loginUser(AuthStrategies.OAUTH, req.user, res)

        res.redirect('/')
    },
)

export default router
