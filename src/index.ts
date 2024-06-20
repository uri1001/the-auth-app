import cookieParser from 'cookie-parser'
import express, { type NextFunction, type Request, type Response } from 'express'
import session from 'express-session'
import passport from 'passport'

import { randomBytes } from 'crypto'

import logger from 'morgan'

import dotenv from 'dotenv'

import { jwtStrategy, oidcStrategyInit, pwdStrategy, vcStrategy } from './middleware/index.js'

import {
    dataRouter,
    errorRouter,
    landingRouter,
    loginRouter,
    logoutRouter,
    oauthRouter,
    oidcRouter,
    profileRouter,
    pwdRouter,
    registerRouter,
    vcRouter,
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

    // middleware
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user as any)
    })

    const oidcStrategy = await oidcStrategyInit()

    passport.use('pwd', pwdStrategy)
    passport.use('jwt', jwtStrategy)
    passport.use('oidc', oidcStrategy)
    passport.use('vc', vcStrategy)

    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    app.use(cookieParser())

    // routes
    app.use('/', landingRouter)

    app.use('/login', loginRouter)
    app.use('/logout', logoutRouter)
    app.use('/register', registerRouter)

    app.use('/oauth2', oauthRouter)
    app.use('/oidc', oidcRouter)
    app.use('/pwd', pwdRouter)
    app.use('/vc', vcRouter)

    app.use('/data', dataRouter)
    app.use('/profile', profileRouter)

    app.use('/error', errorRouter)

    // errors
    app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(error.stack)
        res.status(500).send('Something Broke')
    })

    // server
    app.listen(port, () => {
        console.log(`App Server Listening - http://localhost:${port}`)
    })
}

server().catch(error => {
    console.log(error)
})
