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
    faucet: "https://redwood.chora.io/faucet/",
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
