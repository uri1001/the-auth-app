interface RpcNode {
    rpcNode: string // unique - network scope
    type: 'public' | 'authenticated' | 'local' | 'null'
    http: readonly string[]
    wss?: readonly string[]
    provider: string
}

interface BlockExplorer {
    blockExplorer: string // unique - network scope
    name: string
    type: 'blockscout' | 'etherscan' | 'independent' | 'subscan' | 'null'
    standard: 'eip3091' | 'none' | 'null'
    browserUrl: string
    apiUrl?: string
    docsUrl?: string
}

interface Contract {
    contract: string // unique - network scope
    name: string
    address: string
    deployBlock: number
    deployTxHash: string
}

interface Network {
    id: number // pk
    network: string // pk
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
    contracts?: {
        ensRegistry?: Contract
        ensUniversalResolver?: Contract
        multicall3?: Contract
    }
    baseLayer: string
    testnet: boolean
}

export default Network
