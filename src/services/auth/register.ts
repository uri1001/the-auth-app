import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

import { updateAccount, type Account } from '../../db/index.js'

import { AuthStrategies } from './strategies.js'

import registeredAccount from './registered.js'

const hashPassword = (kdf: string, pwd: string): string => {
    console.log(`\nPassword Hash`)
    console.time('key-derivation-function')
    const rounds = kdf === 'slow' ? 16 : 10
    const salt = bcrypt.genSaltSync(rounds)
    const pwdHash = bcrypt.hashSync(pwd, salt)
    console.timeEnd('key-derivation-function')
    console.log(`Generated Hash - ${pwdHash}\n`)
    return pwdHash
}

const registerAccount = (auth: AuthStrategies, req: any): void => {
    // fetch database account
    const dbAccount: Account | undefined = registeredAccount(auth, req)

    // validate account registration
    if (!(dbAccount == null)) {
        // ensure account is not registered - username-password registration
        if (auth === AuthStrategies.PWD) throw new Error('account already registered in database')
        // finalize registration - user already registered
        return
    }

    // account requested to register
    let reqAccount: Account = {
        id: randomUUID(),
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        emailVerified: false,
        companyName: undefined,
        companyId: undefined,
        employeeId: undefined,
        workplace: undefined,
        role: undefined,
        vcExpTimestamp: undefined,
        password: undefined,
    }

    if (auth === AuthStrategies.OAUTH) {
        reqAccount.username = req.login
        reqAccount.email = req.login
        reqAccount.role = 'user'
    }

    if (auth === AuthStrategies.OIDC) {
        reqAccount.username = req.user.email
        reqAccount.firstName = req.user.given_name
        reqAccount.lastName = req.user.family_name
        reqAccount.email = req.user.email
        reqAccount.emailVerified = req.user.email_verified
        reqAccount.role = 'user'
    }

    if (auth === AuthStrategies.PWD) {
        reqAccount.username = req.body.username
        reqAccount.email = req.body.email
        reqAccount.password = hashPassword(req.body.kdf, req.body.password)
    }

    if (auth === AuthStrategies.VC) reqAccount = req.user

    // TODO: LOG REGISTRATION REQUEST

    // ensure account key exists
    if (reqAccount.username === '') throw new Error('undefined account username')

    updateAccount(reqAccount)
}

export default registerAccount
