import { Strategy as JwtStrategy } from 'passport-jwt'

import { jsonDb } from '../../../db'
import { jwtKey } from '../key'

const cookieExtractor = (req: any): any => {
    return Boolean(req) && Boolean(req.cookies) ? req.cookies['auth-jwt'] : null
}

const opts = {
    secretOrKey: jwtKey,
    jwtFromRequest: cookieExtractor,
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const jwtStrategy = new JwtStrategy(opts, async (jwtPayload: any, done): Promise<void> => {
    try {
        console.log('Submitted JWT Payload - ', jwtPayload)

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const account: any = await jsonDb.getData(`/${jwtPayload.sub}`)

        if (account != null) {
            done(null, {
                username: jwtPayload.sub,
                name: jwtPayload.name,
                familyname: jwtPayload.fam,
            })
            return
        }

        done(null, false)
    } catch (error) {
        console.error(error)
        done(null, false)
    }
})

export default jwtStrategy
