import { Strategy as LocalStrategy } from 'passport-local'

import bcrypt from 'bcrypt'

import { AuthStrategies } from '../../services/index.js'

import { getAccount, type Account } from '../../db/index.js'

import { logAuthentication } from '../log.js'

const opts = {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}

const verifyAccount = (username: string, password: string, done: any): void => {
    try {
        const account: Account | undefined = getAccount(username)

        logAuthentication(AuthStrategies.PWD, { username, password }, account)

        if (account == null) throw new Error('account not registered in database')
        if (account.password == null) throw new Error('account does not have password')

        if (bcrypt.compareSync(password, account.password)) return done(null, { username })

        return done(null, false)
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}

export const pwdStrategy = new LocalStrategy(opts, verifyAccount)

export default pwdStrategy
