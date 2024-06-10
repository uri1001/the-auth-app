import { Strategy as JwtStrategy } from 'passport-jwt'

import { jsonDb } from '../../../db/index.js'
import { jwtKey } from '../key.js'

const cookieExtractor = (req: any): any =>
    Boolean(req) && Boolean(req.cookies) ? req.cookies['auth-jwt'] : null

const opts = {
    secretOrKey: jwtKey,
    jwtFromRequest: cookieExtractor,
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const jwtStrategy = new JwtStrategy(opts, async (jwtPayload: any, done): Promise<void> => {
    try {
        console.log('Submitted JWT Payload - ', jwtPayload)

        let account: any = null

        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            account = await jsonDb.getData(`/${jwtPayload.sub}`)
        } catch (error: any) {
            console.log(error)

            const isEmail: boolean = jwtPayload.sub.includes('@')
            if (!isEmail) throw new Error('invalid user database query')

            const usr = jwtPayload.sub.substring(0, jwtPayload.sub.indexOf('@'))
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            account = await jsonDb.getData(`/${usr}`)
        }

        if (account != null) {
            done(null, {
                username: jwtPayload.sub,
                email: jwtPayload.email,
                name: jwtPayload.name,
                familyname: jwtPayload.fam,
                credentialIssuer: jwtPayload.iss,
                emailVerified: jwtPayload.email_verified,
            })
            return
        }

        done(null, false)
    } catch (error: any) {
        console.error(error)
        done(null, false)
    }
})

export default jwtStrategy
