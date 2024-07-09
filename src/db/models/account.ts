interface Account {
    id: string // ak
    account: string // pk
    name: string
    url: string
    contracts?: string[] // contract-instances[] - fk - pk contract - pk instance
    wallets?: string[] // wallet[] - fk - pk wallet
    rpc?: {
        privacyLevel: 'privacy' | 'partial privacy' | 'no privacy' | 'no info' | 'null'
        privacyPolicy: readonly string[]
    }
}

export const accountModel: Account = {
    // @ts-expect-error invalid type
    id: {
        description: 'internal unique sha256 hash id - ak',
        format: 'hex sha256 digest output of the json object - string',
    },
    // @ts-expect-error invalid type
    account: {
        description: 'unique alphanumerical key - pk',
        format: 'more than 0 characters & less than 21 - string',
    },
    // @ts-expect-error invalid type
    name: {
        description: 'alphanumerical name',
        format: 'more than 0 characters & less than 41 - string',
    },
    // @ts-expect-error invalid type
    url: {
        description: 'info url',
        format: 'start with "https://" & have more than 9 characters - string',
    },
    contracts: {
        // @ts-expect-error invalid type
        description: 'contract instance unique key - fk [contract]',
        format: '<contract-pk>-<contract-instance-pk> - string',
    },
    wallets: {
        // @ts-expect-error invalid type
        description: 'wallet unique key - fk [wallet]',
        format: '<wallet-pk> - string',
    },
    rpc: {
        // @ts-expect-error invalid type
        privacyLevel: {
            description: 'rpc provider privacy level',
            format: 'privacy | partial privacy | no privacy | no info | null',
        },
        privacyPolicy: {
            // @ts-expect-error invalid type
            description: 'rpc provider privacy policy statement url',
            format: 'start with "https://" & have more than 9 characters - string',
        },
    },
}

export default Account
