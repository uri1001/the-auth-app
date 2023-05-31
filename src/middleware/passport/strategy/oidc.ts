import { Issuer, Strategy as OpenIDConnectStrategy } from 'openid-client'

import dotenv from 'dotenv'

dotenv.config()

const oidcStrategyInit = async (): Promise<OpenIDConnectStrategy<any, any>> => {
    // 1. Download the issuer configuration from the well-known openid configuration (OIDC discovery)
    if (process.env.OIDC_PROVIDER == null) throw new Error('undefined oidc provider')

    if (process.env.OIDC_CLIENT_ID == null) throw new Error('undefined oidc client')
    if (process.env.OIDC_CLIENT_SECRET == null) throw new Error('undefined oidc secret')
    if (process.env.OIDC_CALLBACK_URL == null) throw new Error('undefined oidc callback url')

    const oidcIssuer = await Issuer.discover(process.env.OIDC_PROVIDER)

    // 2. Setup an OIDC client/relying party.
    const oidcClient = new oidcIssuer.Client({
        client_id: process.env.OIDC_CLIENT_ID,
        client_secret: process.env.OIDC_CLIENT_SECRET,
        redirect_uris: [process.env.OIDC_CALLBACK_URL],
        response_types: ['code'],
    })

    return new OpenIDConnectStrategy(
        {
            client: oidcClient,
            usePKCE: false, // We are using standard Authorization Code Grant. We do not need PKCE.
        },
        (tokenSet: any, userInfo: any, done: any) => {
            console.log(`\n-----------`)
            console.log(tokenSet, userInfo)
            console.log(`-----------\n`)
            if (tokenSet === undefined || userInfo === undefined) {
                return done('no tokenSet or userInfo')
            }
            return done(null, userInfo)
        },
    )
}

export default oidcStrategyInit
