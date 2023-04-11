import cookieParser from 'cookie-parser'
import express from 'express'
import passport from 'passport'

import logger from 'morgan'

import dotenv from 'dotenv'

import { jwtStrategy, usrPwdStrategy } from './middleware/passport/strategy'

import { dataRouter, landingRouter, loginRouter, logoutRouter, registerRouter } from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT

if (port === undefined) throw new Error('undefined port')

app.use(logger('dev'))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user as any)
})

passport.use('username-password', usrPwdStrategy)
passport.use('jwt', jwtStrategy)

app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(cookieParser())

app.use('/', landingRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/data', dataRouter)

// @ts-expect-error error
app.use((err, _req, res, _next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`App server listening at http://localhost:${port}`)
})
