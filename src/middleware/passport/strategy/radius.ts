import { Strategy as LocalStrategy } from 'passport-local'

import dotenv from 'dotenv'

// const Client = require('node-radius-client')

dotenv.config()

// const client = new Client({
//     host: '127.0.0.1',
// })

const opts = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
}

const radiusStrategy = new LocalStrategy(
    opts,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (username: string, _password: string, done): Promise<void> => {
        try {
            // const res = await client.accessRequest({
            //     secret: process.env.RADIUS_SERVER_SECRET,
            //     attributes: [
            //         ['User-Name', username],
            //         ['User-Password', password],
            //     ],
            // })
            const res = {}
            console.log(res)
            done(null, { username })
        } catch (error: any) {
            console.log(error)
            done(null, false)
        }
    },
)

export default radiusStrategy
