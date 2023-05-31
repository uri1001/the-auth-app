import { Strategy as LocalStrategy } from 'passport-local'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Client = require('node-radius-client')

const client = new Client({
    host: '127.0.0.1',
})

const opts = {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}

const radiusStrategy = new LocalStrategy(
    opts,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (username: string, password: string, done): Promise<void> => {
        try {
            const res = await client.accessRequest({
                secret: 'testing123',
                attributes: [
                    ['User-Name', username],
                    ['User-Password', password],
                ],
            })
            console.log(res)
            done(null, { username })
        } catch (error) {
            console.log(error)
            done(null, false)
        }
    },
)

export default radiusStrategy
