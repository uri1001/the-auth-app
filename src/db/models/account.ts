interface Account {
    account: string // pk
    name: string
    url: string
    contracts?: string[] // contract-instances[] - fk - pk contract - pk instance
    rpc?: {
        privacyLevel: 'privacy' | 'partial privacy' | 'no privacy' | 'no info' | 'null'
        privacyPolicy: readonly string[]
    }
}

export const accountModel: Account = {
    account: 'account key [ string ] - pk',
    name: 'account name [ string ]',
    url: 'account info url [ string ]',
    contracts: ['account contract instance [string] - contract pk - instance pk'],
    rpc: {
        // @ts-expect-error invalid type
        privacyLevel:
            'rpc provider privacy level [ privacy | partial privacy | no privacy | no info | null ]',
        privacyPolicy: ['rpc provider privacy policy statement url [ string ]'],
    },
}

export default Account
