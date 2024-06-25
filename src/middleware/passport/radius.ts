import { Strategy as LocalStrategy } from 'passport-local'

import { fetchAccountsDb, type Account } from '../../db/index.js'
import { AuthStrategies } from '../../services/index.js'

import { getEnv } from '../../system.js'
import { logAuthentication } from '../log.js'

const loadClient = async (): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { default: Client } = await import('node-radius-client')
    return Client
}

const setupRadiusClient = async (): Promise<any> => {
    const Client = await loadClient()
    return new Client({
        host: '127.0.0.1',
    })
}

const clientPromise = setupRadiusClient()

const opts = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
}

const radiusStrategy = new LocalStrategy(
    opts,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (username: string, password: string, done: any): Promise<void> => {
        try {
            const client = await clientPromise
            const res = await client.accessRequest({
                secret: getEnv('RADIUS_SERVER_SECRET'),
                attributes: [
                    ['User-Name', username],
                    ['User-Password', password],
                ],
            })

            const account: Account | undefined = fetchAccountsDb(username)

            logAuthentication(AuthStrategies.OIDC, { username, password, res }, account)

            done(null, { username })
        } catch (error) {
            console.log(error)
            done(null, false)
        }
    },
)

export default radiusStrategy
