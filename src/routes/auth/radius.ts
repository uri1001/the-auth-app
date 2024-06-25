import express from 'express'
import passport from 'passport'

import { AuthStrategies, loginAccount, registerAccount } from '../../services/index.js'

const router = express.Router()

router.post(
    '/',
    passport.authenticate('radius', { failureRedirect: '/error', session: false }),
    (req, res) => {
        if (req.user === undefined) throw new Error('request user undefined')

        // register successful authentication - account could be registered
        registerAccount(AuthStrategies.RADIUS, req)

        // login successful authetication
        loginAccount(AuthStrategies.RADIUS, req, res)

        res.redirect('/')
    },
)

export default router
