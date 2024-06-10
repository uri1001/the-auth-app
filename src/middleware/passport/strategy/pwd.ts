import { Strategy as LocalStrategy } from 'passport-local'

import bcrypt from 'bcrypt'

import { jsonDb } from '../../../db/index.js'

const verifyAccount = async (username: string, password: string, done: any): Promise<void> => {
    try {
        const account: any = await jsonDb.getData(`/${username}`)

        console.log(`Account To Verify: ${username} - ${password}`)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`DB Fetched Account: ${account.username} - ${account.password}`)

        if (bcrypt.compareSync(password, account.password)) return done(null, account)

        return done(null, false)
    } catch (error: any) {
        console.log(error)
        return done(null, false)
    }
}

export const usrPwdStrategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (username, password, done) => {
        console.log('Submitted username - ', username)
        console.log('Submitted password - ', password)
        await verifyAccount(username, password, done)
    },
)

export default usrPwdStrategy
