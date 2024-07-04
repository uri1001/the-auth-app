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
    network: 'network key [ string ] - pk',
    // @ts-expect-error invalid type
    networkId: 'network id evm eip-155 [ number ] - ak',
    name: 'network name [ string ]',
    infoUrl: 'network information url [ string ]',
    docsUrl: 'network documentation url [ string ]',
    eipUrl: 'network link to official community evms list [ string ]',
    nativeCurrency: {
        name: 'native currency offical name [ string ]',
        symbol: 'native currency symbol [ string ]',
        uSymbol: 'native currency smallest unit symbol [ string ]',
        // @ts-expect-error invalid type
        decimals: 'native currency decimals [ number ]',
    },
    rpcNodes: {
        rpcNode: {
            rpcNode: 'network rpc node key [ string ] - uk',
            // @ts-expect-error invalid type
            type: 'network rpc node endpoints specification type [ public | authenticated | local | null ]',
            http: ['network rpc node http endpoint [ string ]'],
            wss: ['network rpc node wss endpoint [ string ]'],
            provider: 'network rpc node provider information [ string ] - fk - account',
        },
        public: {
            rpcNode: 'network default rpc node key [ string ] - uk',
            // @ts-expect-error invalid type
            type: 'network rpc node endpoints specification type [ public | authenticated | local | null ]',
            http: ['network rpc node http endpoint [ string ]'],
            wss: ['network rpc node wss endpoint [ string ]'],
            provider: 'network rpc node provider information [ string ] - fk - account',
        },
        default: {
            rpcNode: 'network public rpc node key [ string ] - uk',
            // @ts-expect-error invalid type
            type: 'network rpc node endpoints specification type [ public | authenticated | local | null ]',
            http: ['network rpc node http endpoint [ string ]'],
            wss: ['network rpc node wss endpoint [ string ]'],
            provider: 'network rpc node provider information [ string ] - fk - account',
        },
    },
    blockExplorers: {
        blockExplorer: {
            blockExplorer: 'network block explorer key [ string ] - uk',
            name: 'network block explorer official name [ string ]',
            // @ts-expect-error invalid type
            type: 'network block explorer implementation type [ blockscout | etherscan | independent | subscan | null ]',
            // @ts-expect-error invalid type
            standard: 'network block explorer urls standard type [ eip3091 | none | null ]',
            browserUrl: 'network block explorer browser base url [ string ]',
            apiUrl: 'network block explorer api base url [ string ]',
            docsUrl: 'network block explorer documentation url [ string ]',
        },
        default: {
            blockExplorer: 'network default block explorer key [ string ] - uk',
            name: 'network block explorer official name [ string ]',
            // @ts-expect-error invalid type
            type: 'network block explorer implementation type [ blockscout | etherscan | independent | subscan | null ]',
            // @ts-expect-error invalid type
            standard: 'network block explorer urls standard type [ eip3091 | none | null ]',
            browserUrl: 'network block explorer browser base url [ string ]',
            apiUrl: 'network block explorer api base url [ string ]',
            docsUrl: 'network block explorer documentation url [ string ]',
        },
    },
    baseLayer: 'network base layer (L0 or L1) [ string ] - fk - network',
    // @ts-expect-error invalid type
    testnet: 'network testnet specification flag [ boolean ]',
}

export default Network
