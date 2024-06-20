import { Strategy as JwtStrategy, type VerifiedCallback } from 'passport-jwt'

import dotenv from 'dotenv'

import { type JwtPayload } from 'jsonwebtoken'

import { AuthStrategies } from '../../services/index.js'

import { getAccount, type Account } from '../../db/index.js'

import { logAuthentication } from '../log.js'

dotenv.config()

const cookieExtractor = (req: any): any =>
    Boolean(req) && Boolean(req.cookies) ? req.cookies['auth-jwt'] : null

const opts = {
    secretOrKey: process.env.JWT_PRIVATE_KEY,
    jwtFromRequest: cookieExtractor,
}

const verifyAccount = (jwtPayload: JwtPayload, done: VerifiedCallback): void => {
    try {
        if (jwtPayload.sub == null) throw new Error('undefined jwt subject')

        const account: Account | undefined = getAccount(jwtPayload.sub)

        logAuthentication(AuthStrategies.JWT, jwtPayload, account)

        if (account == null) throw new Error('account not registered in database')

        done(null, jwtPayload)
    } catch (error) {
        console.log(error)
        done(null, false)
    }
}

const jwtStrategy = new JwtStrategy(opts, verifyAccount)

export default jwtStrategy
