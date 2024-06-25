import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

import { updateAccountsDb, type Account } from '../../db/index.js'

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
    if (auth === AuthStrategies.JWT) throw new Error('jwt authetication strategy not valid')

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
    const account: Account = {
        id: randomUUID(),
        account: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        emailVerified: false,
    }

    if (auth === AuthStrategies.OAUTH) {
        account.account = req.login
        account.username = req.login
        account.email = req.login
        account.employeeRole = 'user'
    }

    if (auth === AuthStrategies.OIDC) {
        account.account = req.user.email
        account.username = req.user.email
        account.firstName = req.user.given_name
        account.lastName = req.user.family_name
        account.email = req.user.email
        account.emailVerified = req.user.email_verified
        account.employeeRole = 'user'
    }

    if (auth === AuthStrategies.PWD) {
        account.account = req.body.username
        account.username = req.body.username
        account.email = req.body.email
        account.password = hashPassword(req.body.kdf, req.body.password)
    }

    if (auth === AuthStrategies.RADIUS) {
        account.account = req.user.username
        account.username = req.user.username
        account.email = req.user.username
        account.emailVerified = true
        account.employeeRole = 'user'
    }

    // TODO
    if (auth === AuthStrategies.VC) {
        account.email = req.email
    }

    // TODO: LOG REGISTRATION REQUEST

    // ensure account key exists
    if (account.account === '') throw new Error('undefined account key')

    updateAccountsDb(account)
}

export default registerAccount
