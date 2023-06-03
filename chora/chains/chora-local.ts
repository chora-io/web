export const choraLocal = {
    chainId: "chora-local",
    chainName: "Chora Local",
    rpc: "http://127.0.0.1:26657",
    rest: "http://127.0.0.1:1317",
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
