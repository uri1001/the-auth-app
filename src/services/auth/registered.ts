import { getAccount, type Account } from '../../db/index.js'

import { AuthStrategies } from './strategies.js'

const registeredAccount = (auth: AuthStrategies, req: any): Account | undefined => {
    let accountKey: string

    switch (auth) {
        case AuthStrategies.OAUTH:
            accountKey = req.login
            break
        case AuthStrategies.OIDC:
            accountKey = req.user.email
            break
        case AuthStrategies.PWD:
            accountKey = req.body.username
            break
        case AuthStrategies.VC:
            accountKey = req.user.email
            break
    }

    const account: Account | undefined = getAccount(accountKey)

    return account
}

export default registeredAccount

// oauth -> username = req.login
// oidc -> username = req.user.email
// pwd -> username = req.body.username
// vc -> username = req.user.email
