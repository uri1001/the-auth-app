import { type JwtPayload } from 'jsonwebtoken'
import { Strategy as JwtStrategy, type VerifiedCallback } from 'passport-jwt'

import { fetchDb } from '../../db/index.js'
import { AuthStrategies } from '../../services/index.js'

import { logAuthentication } from '../../log.js'
import { getEnv } from '../../system.js'

const cookieExtractor = (req: any): any =>
    Boolean(req) && Boolean(req.cookies) ? req.cookies['auth-jwt'] : null

const opts = {
    secretOrKey: getEnv('JWT_PRIVATE_KEY'),
    jwtFromRequest: cookieExtractor,
}

const verifyUser = (jwtPayload: JwtPayload, done: VerifiedCallback): void => {
    try {
        if (jwtPayload.sub == null) throw new Error('undefined jwt subject')

        const user = fetchDb('users', 'user', jwtPayload.sub)

        logAuthentication(AuthStrategies.JWT, jwtPayload, user)

        if (user == null) throw new Error('user not registered in database')

        done(null, jwtPayload)
    } catch (error) {
        console.error(error)
        done(null, false)
    }
}

const jwtStrategy = new JwtStrategy(opts, verifyUser)

export default jwtStrategy
