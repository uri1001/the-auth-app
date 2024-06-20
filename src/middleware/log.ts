import { AuthStrategies } from '../services/auth/strategies.js'

export const logAuthentication = (auth: AuthStrategies, payload: any, info: any): void => {
    console.log(`\nPassport - ${auth} strategy`)

    if (auth === AuthStrategies.PWD) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(` - Submitted Account - usr: ${payload.username} - pwd: ${payload.password}`)
    } else {
        console.log(' - Submitted JWT Payload- ', payload)
    }

    console.log(` - Authenticated Account - `, info)
}
