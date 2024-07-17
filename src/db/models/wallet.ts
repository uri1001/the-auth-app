interface Instance {
    instance: string // pk
    type: 'eoa' | 'multisig' | 'null'
    network: string // fk - pk network
    address: string // uk - network
}

interface Wallet {
    id: string // ak
    wallet: string // pk
    name: string
    instances: Record<string, Instance>
}

export const walletModel: Wallet = {
    // @ts-expect-error invalid type
    id: {
        description: 'internal unique sha256 hash id - ak',
        format: 'hex sha256 digest output of the json object - string',
    },
    // @ts-expect-error invalid type
    wallet: {
        description: 'unique alphanumerical key - pk',
        format: 'more than 0 characters & less than 21 - string',
    },
    // @ts-expect-error invalid type
    name: {
        description: 'alphanumerical offical name',
        format: 'more than 0 characters & less than 41 - string',
    },
    instances: [
        {
            // @ts-expect-error invalid type
            instance: {
                description: 'instance alphanumerical unique key - pk',
                format: 'more than 0 characters & less than 21 - string',
            },
            // @ts-expect-error invalid type
            type: {
                description: 'wallet type',
                format: 'eoa | multisig | null',
            },
            // @ts-expect-error invalid type
            network: {
                description: 'instance network key - fk [network]',
                format: '<network-pk>',
            },
            // @ts-expect-error invalid type
            address: {
                description: 'instance address as of eip-1191 - uk [network]',
                format: 'evm address standard format checksum encoded - [0x + 40 hexadecimal characters]',
            },
        },
    ],
}

export default Wallet
