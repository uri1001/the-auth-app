import { type User } from './db/index.js'
import { AuthStrategies } from './services/index.js'

export const logAuthentication = (auth: AuthStrategies, payload: any, info: any): void => {
    console.log(`\n--- Passport Authentication Request - ${auth} strategy ---\n`)

    if (auth === AuthStrategies.PWD) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(` - Submitted User - usr: ${payload.username} - pwd: ${payload.password}`)
    } else if (auth === AuthStrategies.RADIUS) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(` - Submitted User - usr: ${payload.username} - pwd: ${payload.password}`)
        console.log(' - Radius Server Response - ', payload.res)
    } else {
        console.log(' - Submitted JWT Payload - ', payload)
    }

    console.log(` - Authenticated User - `, info)
}

export const logRegistration = (
    auth: AuthStrategies,
    user: User,
    dbUser: User | undefined,
): void => {
    console.log(`\n--- User Registration Request ---\n`)
    console.log(` - Authentication Strategy - ${auth}`)
    console.log(' - Registration User - ', user)
    console.log(' - Database User - ', dbUser, `\n`)
}

export const logJwt = (token: string, key: string): void => {
    console.log(`\n--- JWT - issued token ---\n`)
    console.log(` - Token sent. Debug at https://jwt.io/?value=${token}`)
    console.log(` - Token secret (to verify signature): ${key}\n`)
}

export const logDbRequest = (action: string, parameter: string, payload: string): void => {
    console.log(`\n--- Database Request ---\n`)
    console.log(` - Request Action - ${action}`)
    if (action === 'fetch' || action === 'delete')
        console.log(` - Request Data Parameter - ${parameter}`)
    console.log(' - Request Payload - ', payload, `\n`)
}

export const logApiRequest = (auth: boolean, url: string, reqData: any, resData: any): void => {
    console.log(`\n--- External API Request ---\n`)
    console.log(` - Request URL - ${url} - Authenticated - ${String(auth)}`)
    console.log(' - Request Data - ', reqData)
    console.log(' - Response Data - ', resData, `\n`)
}
