import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

import { fetchDb, type User } from '../../db/index.js'
import { AuthStrategies } from '../../services/index.js'

import { logAuthentication } from '../log.js'

const opts = {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}

const verifyUser = (username: string, password: string, done: any): void => {
    try {
        const res = fetchDb('users', 'user', username)

        if (res.length > 1) throw new Error('invalid database fetch query')

        const user = res[0] as User

        logAuthentication(AuthStrategies.PWD, { username, password }, user)

        if (user == null) throw new Error('user not registered in database')
        if (user.password == null) throw new Error('user does not have password')

        if (bcrypt.compareSync(password, user.password)) return done(null, { username })

        done(null, false)
    } catch (error) {
        console.log(error)
        done(null, false)
    }
}

export const pwdStrategy = new LocalStrategy(opts, verifyUser)

export default pwdStrategy
