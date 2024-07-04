import { LowSync } from 'lowdb'
import { DataFileSync, JSONFileSyncPreset } from 'lowdb/node'

import { type Account, type Contract, type Network, type User, type Wallet } from './index.js'
import { decrypt, encrypt } from './utils/crypto.js'

interface Users {
    users: User[]
}

interface Accounts {
    accounts: Account[]
}

interface Contracts {
    contracts: Contract[]
}

interface Networks {
    networks: Network[]
}

interface Wallets {
    wallets: Wallet[]
}

const usersAdapter = new DataFileSync<Users>('./db/.users', {
    parse: (str: string) => {
        const decrypted = decrypt(str)
        return JSON.parse(decrypted)
    },
    stringify: (data: any) => {
        const encrypted = encrypt(JSON.stringify(data))
        return encrypted
    },
})

const usersDb = new LowSync(usersAdapter, { users: [] })

const accountsDb = JSONFileSyncPreset<Accounts>('./db/accounts.json', { accounts: [] })

const contractsDb = JSONFileSyncPreset<Contracts>('./db/contracts.json', { contracts: [] })

const networksDb = JSONFileSyncPreset<Networks>('./db/networks.json', { networks: [] })

const walletsDb = JSONFileSyncPreset<Wallets>('./db/wallets.json', { wallets: [] })

interface DB {
    accounts: LowSync<Accounts>
    contracts: LowSync<Contracts>
    networks: LowSync<Networks>
    wallets: LowSync<Wallets>
    users: LowSync<Users>
}

export type DBSchemas = 'accounts' | 'contracts' | 'networks' | 'users'

export const db: DB = {
    accounts: accountsDb,
    contracts: contractsDb,
    networks: networksDb,
    wallets: walletsDb,
    users: usersDb,
}
