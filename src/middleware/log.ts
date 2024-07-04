import { AuthStrategies } from '../services/index.js'

export const logAuthentication = (auth: AuthStrategies, payload: any, info: any): void => {
    console.log(`\nPassport - ${auth} strategy`)

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
