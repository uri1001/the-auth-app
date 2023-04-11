import { Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

import scryptMcf from 'scrypt-mcf'

import { jsonDb } from '../../db'
import { jwtKey } from './key'

const verifyAccount = async (username: string, password: string, done: any): Promise<void> => {
    try {
        const account: any = await jsonDb.getData(`/${username}`)

        console.log(`Account To Verify: ${username} - ${password}`)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`DB Fetched Account: ${account.username} - ${account.password}`)

        if (await scryptMcf.verify(password, account.password)) return done(null, account)

        return done(null, false)
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}

export const usrPwdStrategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (username, password, done) => {
        await verifyAccount(username, password, done)
    },
)

const cookieExtractor = (req: any): any => {
    return Boolean(req) && Boolean(req.cookies) ? req.cookies['auth-jwt'] : null
}

const opts = {
    secretOrKey: jwtKey,
    jwtFromRequest: cookieExtractor,
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const jwtStrategy = new JwtStrategy(opts, async (jwtPayload: any, done) => {
    try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const account: any = await jsonDb.getData(`/${jwtPayload.sub}`)

        if (account != null) {
            done(null, { username: jwtPayload.sub })
            return
        }

        done(null, false)
        return
    } catch (error) {
        console.error(error)
        done(null, false)
    }
})
