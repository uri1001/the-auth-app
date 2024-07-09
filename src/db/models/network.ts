interface RpcNode {
    rpcNode: string // uk - network
    type: 'public' | 'authenticated' | 'local' | 'null'
    http: readonly string[]
    wss?: readonly string[]
    provider: string // fk - pk account
}

interface BlockExplorer {
    blockExplorer: string // uk - network
    name: string
    type: 'blockscout' | 'etherscan' | 'independent' | 'subscan' | 'null'
    standard: 'eip3091' | 'none' | 'null'
    browserUrl: string
    apiUrl?: string
    docsUrl?: string
}

interface Network {
    id: string
    network: string // pk
    networkId: number // ak
    name: string
    infoUrl: string
    docsUrl: string
    eipUrl: string
    nativeCurrency: {
        name: string
        symbol: string
        uSymbol: string
        decimals: number
    }
    rpcNodes: {
        [key: string]: RpcNode
        public: RpcNode
        default: RpcNode
    }
    blockExplorers?: {
        [key: string]: BlockExplorer
        default: BlockExplorer
    }
    baseLayer: string // fk - pk network
    testnet: boolean
}

export const networkModel: Network = {
    // @ts-expect-error invalid type
    id: {
        description: 'internal unique sha256 hash id - ak',
        format: 'hex sha256 digest output of the json object - string',
    },
    // @ts-expect-error invalid type
    network: {
        description: 'unique alphanumerical key - pk',
        format: 'more than 0 characters & less than 21 - string',
    },
    // @ts-expect-error invalid type
    networkId: {
        description: 'id evm eip-155 - ak',
        format: 'integer & positive number - number',
    },
    // @ts-expect-error invalid type
    name: {
        description: 'alphanumerical offical name',
        format: 'more than 0 characters & less than 41 - string',
    },
    // @ts-expect-error invalid type
    infoUrl: {
        description: 'information url',
        format: 'start with "https://" & have more than 9 characters - string',
    },
    // @ts-expect-error invalid type
    docsUrl: {
        description: 'documentation url',
        format: 'start with "https://" & have more than 9 characters - string',
    },
    // @ts-expect-error invalid type
    eipUrl: {
        description: 'link to official community evms list',
        format: 'https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-<network-id>.json - string',
    },
    nativeCurrency: {
        // @ts-expect-error invalid type
        name: {
            description: 'network native currency name',
            format: 'more than 0 characters & less than 21 - string',
        },
        // @ts-expect-error invalid type
        symbol: {
            description: 'network native currency symbol',
            format: 'more than 0 characters & less than 5 & uppercase - string',
        },
        // @ts-expect-error invalid type
        uSymbol: {
            description: 'network native currency smallest unit symbol',
            format: 'more than 0 characters & less than 7 - string',
        },
        // @ts-expect-error invalid type
        decimals: {
            description: 'native currency decimals',
            format: 'natural integer - number',
        },
    },
    rpcNodes: {
        rpcNode: {
            // @ts-expect-error invalid type
            rpcNode: {
                description: 'network rpc node unique alphanumerical key - uk',
                format: 'more than 0 characters & less than 21 - string',
            },
            // @ts-expect-error invalid type
            type: {
                description: 'network rpc node endpoints connection type',
                format: 'public | authenticated | local | null',
            },
            http: {
                // @ts-expect-error invalid type
                description: 'network rpc node api http endpoint',
                format: 'start with "http://" or "https://" & have more than 8 characters - string',
            },
            wss: {
                // @ts-expect-error invalid type
                description: 'network rpc node api wss endpoint',
                format: 'start with "wss://" & have more than 8 characters - string',
            },
            // @ts-expect-error invalid type
            provider: {
                description: 'network rpc node provider information - fk [account]',
                format: '<network-pk>',
            },
        },
        // @ts-expect-error invalid type
        public: {},
        // @ts-expect-error invalid type
        default: {},
    },
    blockExplorers: {
        blockExplorer: {
            // @ts-expect-error invalid type
            blockExplorer: {
                description: 'network block explorer unique alphanumerical key - uk',
                format: 'more than 0 characters & less than 21 - string',
            },
            // @ts-expect-error invalid type
            name: {
                description: 'network block explorer aphanumerical name',
                format: 'more than 0 characters & less than 41 - string',
            },
            // @ts-expect-error invalid type
            type: {
                description: 'network block explorer api url endpoint schema type',
                format: 'blockscout | etherscan | independent | subscan | null',
            },
            // @ts-expect-error invalid type
            standard: {
                description: 'network block explorer browser url endpoint standard schema type',
                format: 'eip3091 | none | null',
            },
            // @ts-expect-error invalid type
            browserUrl: {
                description: 'network block explorer browser base url',
                format: 'start with "https://" & have more than 9 characters - string',
            },
            // @ts-expect-error invalid type
            apiUrl: {
                description: 'network block explorer api base url',
                format: 'start with "https://" & have more than 9 characters - string',
            },
            // @ts-expect-error invalid type
            docsUrl: {
                description: 'network block explorer documentation url',
                format: 'start with "https://" & have more than 9 characters - string',
            },
        },
        // @ts-expect-error invalid type
        default: {},
    },
    // @ts-expect-error invalid type
    baseLayer: {
        description: 'network base layer (layer-0 or layer-1) - fk [network]',
        format: '<network-pk>',
    },
    // @ts-expect-error invalid type
    testnet: {
        description: 'network testnet specification flag (true if network is a testnet)',
        format: 'boolean',
    },
}

export default Network
