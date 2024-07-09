import { type JwtPayload } from 'jsonwebtoken'
import { Issuer, Strategy as OpenIDConnectStrategy } from 'openid-client'

import { fetchDb } from '../../db/index.js'
import { AuthStrategies } from '../../services/index.js'

import { logAuthentication } from '../../log.js'
import { getEnv } from '../../system.js'

const oidcStrategyInit = async (): Promise<OpenIDConnectStrategy<any, any>> => {
    // download the issuer configuration from the well-known openid configuration (OIDC discovery)
    const oidcIssuer = await Issuer.discover(getEnv('OIDC_PROVIDER'))

    // setup an OIDC client/relying party.
    const oidcClient = new oidcIssuer.Client({
        client_id: getEnv('OIDC_CLIENT_ID'),
        client_secret: getEnv('OIDC_CLIENT_SECRET'),
        redirect_uris: [getEnv('OIDC_CALLBACK_URL')],
        response_types: ['code'],
    })

    return new OpenIDConnectStrategy(
        {
            client: oidcClient,
            usePKCE: false, // using standard Authorization Code Grant - do not need PKCE
        },
        (tokenSet: JwtPayload, userInfo: any, done: any) => {
            if (tokenSet === undefined) return done('no token set provided')
            if (userInfo == null) return done('no user info provided')

            const user = fetchDb('users', 'user', userInfo.email)

            logAuthentication(AuthStrategies.OIDC, { tokenSet, userInfo }, user)

            done(null, userInfo)
        },
    )
}

export default oidcStrategyInit
