import express, { type Request, type Response } from 'express'

import passport from 'passport'

import { AuthStrategies, loginUser, registerUser } from '../../services/index.js'

const router = express.Router()

// login
router.post(
    '/login',
    passport.authenticate('pwd', { failureRedirect: '/error', session: false }),
    (req: Request, res: Response): void => {
        if (req.user == null) throw new Error('request user undefined')

        // login successful authentication
        loginUser(AuthStrategies.PWD, req, res)

        res.redirect('/')
    },
)

// register
router.post('/register', (req: Request, res: Response): void => {
    if (req.body == null) throw new Error('request body undefined')

    // register user - ensures user not registered
    registerUser(AuthStrategies.PWD, req)

    res.redirect('/')
})

export default router
