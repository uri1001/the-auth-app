import db from '../db.js'

import type Account from '../models/account.js'

const updateAccount = (account: Account): void => {
    db.update(({ accounts }) => accounts.push(account))
}

export default updateAccount
