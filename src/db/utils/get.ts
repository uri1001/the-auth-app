import db from '../db.js'

import type Account from '../models/account.js'

const getAccount = (username: string): Account | undefined => {
    db.read()
    return db.data.accounts.find(a => a.username === username)
}

export default getAccount
