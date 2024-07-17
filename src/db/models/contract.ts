interface Instance {
    instance: string // pk
    network: string // fk - pk network
    address: string // uk - network
    implAddress: string
    deployBlock: bigint
    deployTxHash: string // uk - network
    erc20?: {
        name: string
        symbol: string
        uSymbol: string
        decimals: number
    }
    oracle?: {
        erc20?: string // fk - pk contract + pk instance
    }
}

interface Contract {
    id: string // ak
    contract: string // pk
    name: string
    type: 'erc20' | 'oracle' | 'multisig' | 'null'
    instances: Instance[]
    sourceCode: string
    abi: string // uk
    abiSha256: string // uk
}

export const contractModel: Contract = {
    // @ts-expect-error invalid type
    id: {
        description: 'internal unique sha256 hash id - ak',
        format: 'hex sha256 digest output of the json object - string',
    },
    // @ts-expect-error invalid type
    contract: {
        description: 'unique alphanumerical key - pk',
        format: 'more than 0 characters & less than 21 - string',
    },
    // @ts-expect-error invalid type
    name: {
        description: 'alphanumerical name',
        format: 'more than 0 characters & less than 41 - string',
    },
    // @ts-expect-error invalid type
    type: {
        description: 'type',
        format: 'erc20 | oracle | multisig | null',
    },
    instances: [
        {
            // @ts-expect-error invalid type
            instance: {
                description: 'instance alphanumerical unique key - pk',
                format: 'more than 0 characters & less than 21 - string',
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
            // @ts-expect-error invalid type
            implAddress: {
                description: 'instance implementation address as of eip-1191',
                format: 'evm address standard format checksum encoded - [0x + 40 hexadecimal characters]',
            },
            // @ts-expect-error invalid type
            deployBlock: {
                description: 'instance deploy transaction block number',
                format: 'integer & positive number - bigint',
            },
            // @ts-expect-error invalid type
            deployTxHash: {
                description: 'instance deploy transaction hash - uk [network]',
                format: 'evm 32 bytes keccak256 transaction hash - [0x + 64 hexadecimal characters]',
            },
            erc20: {
                // @ts-expect-error invalid type
                name: {
                    description: 'erc20 token offical name',
                    format: 'more than 0 characters & less than 21 - string',
                },
                // @ts-expect-error invalid type
                symbol: {
                    description: 'erc20 token symbol',
                    format: 'more than 0 characters & less than 5 & uppercase - string',
                },
                // @ts-expect-error invalid type
                uSymbol: {
                    description: 'erc20 token smallest unit symbol',
                    format: 'more than 0 characters & less than 7 - string',
                },
                // @ts-expect-error invalid type
                decimals: {
                    description: 'erc20 token decimals',
                    format: 'natural integer - number',
                },
            },
            oracle: {
                // @ts-expect-error invalid type
                erc20: {
                    description: 'oracle erc20 token contract instance unique key - fk [contract]',
                    format: '<contract-pk>-<contract-instance-pk> - string',
                },
            },
        },
    ],
    // @ts-expect-error invalid type
    sourceCode: {
        descriptio: 'source code url',
        format: 'start with "https://" & have more than 9 characters - string',
    },
    // @ts-expect-error invalid type
    abi: {
        description: 'abi json file name - uk',
        format: 'exact filename of the contract abi json file in abis folder - string',
    },
    // @ts-expect-error invalid type
    abiSha256: {
        description: 'abi json file sha256 digest output - uk',
        format: 'hex sha256 digest output - string',
    },
}

export default Contract
