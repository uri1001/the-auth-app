import { type Request } from 'express'
import { Strategy as CustomStrategy, type VerifiedCallback } from 'passport-custom'

import { reqTokenOauth, reqUserDataOauth } from '../../adapters/index.js'
import { fetchDb } from '../../db/index.js'
import { AuthStrategies } from '../../services/index.js'

import { logAuthentication } from '../../log.js'
import { getEnv } from '../../system.js'

const verifyUser = async (req: Request, done: VerifiedCallback): Promise<void> => {
    try {
        if (req.query.code == null) throw new Error('no request code provided')

        // request jwt to oauth provider
        const params = await reqTokenOauth(
            getEnv('OAUTH2_TOKEN_URL'),
            getEnv('OAUTH2_CLIENT_ID'),
            getEnv('OAUTH2_CLIENT_SECRET'),
            req.query.code as string,
        )

        // validate oauth token & scope
        const accessToken = params.get('access_token')
        const scope = params.get('scope')

        if (accessToken == null) throw new Error('undefined access token')
        if (scope !== 'user:email') throw new Error('user did not consent to release email')

        // request user data to oauth provider
        const userData = await reqUserDataOauth(getEnv('OAUTH2_USER_API'), accessToken)

        const user = fetchDb('users', 'user', userData.login)

        logAuthentication(AuthStrategies.VC, userData, user)

        done(null, userData)
    } catch (error) {
        console.error(error)
        done(null, false)
    }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const vcStrategy = new CustomStrategy(verifyUser)

export default vcStrategy
