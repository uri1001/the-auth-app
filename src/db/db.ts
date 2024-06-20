import { JSONFileSyncPreset } from 'lowdb/node'

import { type Account } from './index.js'

interface Data {
    accounts: Account[]
}

const defaultData: Data = { accounts: [] }

const db = JSONFileSyncPreset<Data>('./db/accounts.json', defaultData)

export default db
