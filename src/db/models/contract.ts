interface Instance {
    instance: string // pk
    network: string // fk - pk network
    address: string // uk - network
    implAddress: string
    deployBlock: bigint
    deployTxHash: string // uk - network
    erc20?: {
        symbol: string
        uSymbol: string
        decimals: number
    }
    oracle?: {
        erc20?: string // fk - pk contract + pk instance
    }
}

interface Contract {
    contract: string // pk
    name: string
    type: 'erc20' | 'oracle' | 'multisig' | 'null'
    instances: Instance[]
    sourceCode: string
    abi: string // uk
    abiSha256: string // uk
}

export const contractModel: Contract = {
    contract: 'contract key [ string ] - pk',
    name: 'contract name [ string ]',
    // @ts-expect-error invalid type
    type: 'contract type [ erc20 | oracle | multisig | null ]',
    instances: [
        {
            instance: 'contract instance key [ string ] - pk',
            network: 'contract instance network key [ string ] - fk - networks',
            address: 'contract instance address [ string ] - uk - networks',
            implAddress: 'contract instance implementation address [ string ]',
            // @ts-expect-error invalid type
            deployBlock: 'contract instance deploy block [ bigint ]',
            deployTxHash: 'contract instance deploy tx hash [ string ] - uk - networks',
            erc20: {
                symbol: 'erc20 contract token symbol [ string ]',
                uSymbol: 'erc20 contract token smallest unit symbol [ string ]',
                // @ts-expect-error invalid type
                decimals: 'erc20 contract token decimals [ number ]',
            },
            oracle: {
                erc20: 'oracle contract erc20 token price feed [ string ] - contract pk - instance pk',
            },
        },
    ],
    sourceCode: 'contract source code url [ string ]',
    abi: 'contract abi json file name [ string ] - uk',
    abiSha256: 'contract abi json file sha256 output [ string ] - uk',
}

export default Contract
