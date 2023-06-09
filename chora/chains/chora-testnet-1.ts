export const choraTestnet = {
    chainId: "chora-testnet-1",
    chainName: "Chora Testnet",
    rpc: "https://testnet.chora.io/rpc",
    rest: "https://testnet.chora.io/rest",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "chora",
        bech32PrefixAccPub: "chorapub",
        bech32PrefixValAddr: "choravaloper",
        bech32PrefixValPub: "choravaloperpub",
        bech32PrefixConsAddr: "choravalcons",
        bech32PrefixConsPub: "choravalconspub",
    },
    currencies: [
        {
            coinDenom: "CHORA",
            coinMinimalDenom: "uchora",
            coinDecimals: 6,
            coinGeckoId: "chora",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "CHORA",
            coinMinimalDenom: "uchora",
            coinDecimals: 6,
            coinGeckoId: "chora",
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "CHORA",
        coinMinimalDenom: "uchora",
        coinDecimals: 6,
        coinGeckoId: "chora",
    },
}

export const choraTestnetX = {
    faucet: "https://testnet.chora.io/faucet/",
}
