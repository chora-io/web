export const regenLocal = {
    chainId: "regen-local",
    chainName: "Regen Local",
    rpc: "http://127.0.0.1:26657",
    rest: "http://127.0.0.1:1317",
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
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6,
            coinGeckoId: "stake",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6,
            coinGeckoId: "stake",
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "STAKE",
        coinMinimalDenom: "stake",
        coinDecimals: 6,
        coinGeckoId: "stake",
    },
}

export const regenLocalX = {
    faucet: "http://127.0.0.1:8000",
}
