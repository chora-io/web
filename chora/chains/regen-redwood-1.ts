export const regenRedwood = {
    chainId: "regen-redwood-1",
    chainName: "Regen Redwood",
    rpc: "https://redwood.chora.io/rpc",
    rest: "https://redwood.chora.io/rest",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "regen",
        bech32PrefixAccPub: "regenpub",
        bech32PrefixValAddr: "regenvaloper",
        bech32PrefixValPub: "regenvaloperpub",
        bech32PrefixConsAddr: "regenvalcons",
        bech32PrefixConsPub: "regenvalconspub",
    },
    currencies: [
        {
            coinDenom: "REGEN",
            coinMinimalDenom: "uregen",
            coinDecimals: 6,
            coinGeckoId: "regen",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "REGEN",
            coinMinimalDenom: "uregen",
            coinDecimals: 6,
            coinGeckoId: "regen",
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "REGEN",
        coinMinimalDenom: "uregen",
        coinDecimals: 6,
        coinGeckoId: "regen",
    },
}

export const regenRedwoodX = {
    faucet: "https://redwood.chora.io/faucet",
}
