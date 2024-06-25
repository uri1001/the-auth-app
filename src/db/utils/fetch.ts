import db from '../db.js'

import type Account from '../models/account.js'

export const fetchAccountsDb = (account: string): Account | undefined => {
    db.read()
    return db.data.accounts.find(a => a.account === account)
}
