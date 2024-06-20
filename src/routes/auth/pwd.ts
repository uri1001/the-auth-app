import express, { type Request, type Response } from 'express'

import passport from 'passport'

import { AuthStrategies, loginAccount, registerAccount } from '../../services/index.js'

const router = express.Router()

// login
router.post(
    '/login',
    passport.authenticate('pwd', { failureRedirect: '/error', session: false }),
    (req: Request, res: Response): void => {
        if (req.user == null) throw new Error('request user undefined')

        // login successful authentication
        loginAccount(AuthStrategies.PWD, req, res)

        res.redirect('/')
    },
)

// register
router.post('/register', (req: Request, res: Response): void => {
    if (req.body == null) throw new Error('request body undefined')

    // register account - ensures account not registered
    registerAccount(AuthStrategies.PWD, req)

    res.redirect('/')
})

export default router
