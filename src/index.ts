import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { randomBytes } from 'crypto'

import logger from 'morgan'

import dotenv from 'dotenv'

import {
    jwtStrategy,
    oidcStrategyInit,
    radiusStrategy,
    usrPwdStrategy,
} from './middleware/passport/index.js'

import {
    dataRouter,
    errorRouter,
    landingRouter,
    loginRouter,
    logoutRouter,
    oauthRouter,
    oidcRouter,
    profileRouter,
    radiusRouter,
    registerRouter,
} from './routes/index.js'

dotenv.config()

const sessionKey = randomBytes(32)

const server = async (): Promise<void> => {
    const app = express()
    const port = process.env.PORT

    if (port === undefined) throw new Error('undefined port')

    app.use(logger('dev'))

    app.use(
        session({
            secret: sessionKey.toString('base64url'),
            resave: false,
            saveUninitialized: false,
        }),
    )

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user as any)
    })

    const oidcStrategy = await oidcStrategyInit()

    passport.use('username-password', usrPwdStrategy)
    passport.use('jwt', jwtStrategy)
    passport.use('oidc', oidcStrategy)
    passport.use('local-radius', radiusStrategy)

    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    app.use(cookieParser())

    app.use('/', landingRouter)

    app.use('/register', registerRouter)
    app.use('/login', loginRouter)
    app.use('/radius', radiusRouter)
    app.use('/oauth2', oauthRouter)
    app.use('/oidc', oidcRouter)
    app.use('/logout', logoutRouter)

    app.use('/data', dataRouter)
    app.use('/profile', profileRouter)

    app.use('/error', errorRouter)

    // @ts-expect-error error
    app.use((err, _req, res, _next) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })

    app.listen(port, () => {
        console.log(`App server listening at http://localhost:${port}`)
    })
}

server().catch(error => {
    console.log(error)
})
