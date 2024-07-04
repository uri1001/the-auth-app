import express from 'express'
import passport from 'passport'

import { AuthStrategies, loginUser, registerUser } from '../../services/index.js'

const router = express.Router()

router.post(
    '/',
    passport.authenticate('radius', { failureRedirect: '/error', session: false }),
    (req, res) => {
        if (req.user === undefined) throw new Error('request user undefined')

        // register successful authentication - user could be registered
        registerUser(AuthStrategies.RADIUS, req)

        // login successful authetication
        loginUser(AuthStrategies.RADIUS, req, res)

        res.redirect('/')
    },
)

export default router
