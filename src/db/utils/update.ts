import db from '../db.js'

import type Account from '../models/account.js'

export const updateAccountsDb = (account: Account): void => {
    db.update(({ accounts }) => accounts.push(account))
}
