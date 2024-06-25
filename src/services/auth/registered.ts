import { fetchAccountsDb, type Account } from '../../db/index.js'

import { AuthStrategies } from './strategies.js'

const registeredAccount = (auth: AuthStrategies, req: any): Account | undefined => {
    let accountKey: string = ''

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
        case AuthStrategies.RADIUS:
            accountKey = req.user.username
            break
        case AuthStrategies.VC:
            accountKey = req.user.email
            break
    }

    const account: Account | undefined = fetchAccountsDb(accountKey)

    return account
}

export default registeredAccount

// oauth -> account = req.login
// oidc -> account = req.user.email
// pwd -> account = req.body.username
// radius -> account = req.user.username
// vc -> account = req.user.email
