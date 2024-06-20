type Env =
    | 'PORT'
    | 'JWT_SESSION_LENGTH_SECONDS'
    | 'JWT_PUBLIC_KEY'
    | 'JWT_PRIVATE_KEY'
    | 'OAUTH2_CLIENT_ID'
    | 'OAUTH2_CLIENT_SECRET'
    | 'OAUTH2_AUTHORIZE_URL'
    | 'OAUTH2_TOKEN_URL'
    | 'USER_API'
    | 'OIDC_CLIENT_ID'
    | 'OIDC_CLIENT_SECRET'
    | 'OIDC_PROVIDER'
    | 'OIDC_CALLBACK_URL'
    | 'VC_PROVIDER_ISSUE_URL'
    | 'VC_PROVIDER_LOGIN_URL'
    | 'VC_PROVIDER_ENDPOINT_AUTH_ID'
    | 'VC_PROVIDER_ENDPOINT_AUTH_PWD'
    | 'VC_PROVIDER_PUBLIC_KEY'

export const getEnv = (key: Env): string => {
    const value = process.env[key]
    if (value == null) throw new Error(`undefined environment variable - ${key}`)
    return value
}
