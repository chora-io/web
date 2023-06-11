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
    modules: [
        {
            moduleName: "authz",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
            specification: "https://docs.cosmos.network/main/modules/authz",
        },
        {
            moduleName: "bank",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
            specification: "https://docs.cosmos.network/main/modules/bank",
        },
        {
            moduleName: "data",
            gitRepository: "https://github.com/regen-network/regen-ledger",
            gitVersion: "v5.1.2",
            gitVersionLink: "https://github.com/regen-network/regen-ledger/tree/v5.1.2",
            specification: "https://docs.regen.network/modules/data",
        },
        {
            moduleName: "ecocredit",
            gitRepository: "https://github.com/regen-network/regen-ledger",
            gitVersion: "v5.1.2",
            gitVersionLink: "https://github.com/regen-network/regen-ledger/tree/v5.1.2",
            specification: "https://docs.regen.network/modules/ecocredit",
        },
        {
            moduleName: "feegrant",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
            specification: "https://docs.cosmos.network/main/modules/feegrant",
        },
        {
            moduleName: "group",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
            specification: "https://docs.cosmos.network/main/modules/group",
        },
        {
            moduleName: "intertx",
            gitRepository: "https://github.com/regen-network/regen-ledger",
            gitVersion: "v5.1.2",
            gitVersionLink: "https://github.com/regen-network/regen-ledger/tree/v5.1.2",
            specification: "https://docs.regen.network/modules/intertx",
        },
    ],
}
