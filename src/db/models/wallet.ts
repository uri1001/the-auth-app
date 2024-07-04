interface Instance {
    instance: string // pk
    network: string // fk - pk network
    address: string // uk - network
    multisig?: {
        threshold: number
        signers: string[]
        contract: string // fk - pk contract + pk instance
    }
}

interface Wallet {
    wallet: string // pk
    name: string
    account: string // fk - pk account
    type: 'eoa' | 'multisig' | 'null'
    instances: Record<string, Instance>
}

export const walletModel: Wallet = {
    wallet: 'wallet key [ string ] - pk',
    name: 'wallet official name [ string ]',
    account: 'wallet related account [ string ] - fk - account',
    // @ts-expect-error invalid type
    type: 'wallet specification type [ eoa | multisig | null ]',
    instances: [
        {
            instance: 'wallet instance key [ string ] - pk',

            network: 'wallet instance network [ string ] - fk - network',
            address: 'wallet instance address [ string ] - uk - network',
            multisig: {
                // @ts-expect-error invalid type
                threshold: 'wallet multisignature instance signing threshold [ number ]',
                signers: ['wallet multisignature instance signer address [ string ]'],
                contract:
                    'wallet multisignature instance contract key [ string ] - fk -  pk contract + pk instance',
            },
        },
    ],
}

export default Wallet
