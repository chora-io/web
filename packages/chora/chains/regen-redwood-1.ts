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
    coopId: "10",
    faucet: "https://redwood.chora.io/faucet/",
    server: "https://server.chora.io",
    modules: [
        {
            moduleName: "authz",
            documentation: "https://docs.cosmos.network/main/modules/authz",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
        },
        {
            moduleName: "bank",
            documentation: "https://docs.cosmos.network/main/modules/bank",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
        },
        {
            moduleName: "data",
            documentation: "https://docs.regen.network/modules/data",
            gitRepository: "https://github.com/regen-network/regen-ledger",
            gitVersion: "v5.1.2",
            gitVersionLink: "https://github.com/regen-network/regen-ledger/tree/v5.1.2",
        },
        {
            moduleName: "ecocredit",
            documentation: "https://docs.regen.network/modules/ecocredit",
            gitRepository: "https://github.com/regen-network/regen-ledger",
            gitVersion: "v5.1.2",
            gitVersionLink: "https://github.com/regen-network/regen-ledger/tree/v5.1.2",
        },
        {
            moduleName: "feegrant",
            documentation: "https://docs.cosmos.network/main/modules/feegrant",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
        },
        {
            moduleName: "group",
            documentation: "https://docs.cosmos.network/main/modules/group",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
        },
        {
            moduleName: "intertx",
            gitRepository: "https://github.com/regen-network/regen-ledger",
            gitVersion: "v5.1.2",
            gitVersionLink: "https://github.com/regen-network/regen-ledger/tree/v5.1.2",
            documentation: "https://docs.regen.network/modules/intertx",
        },
    ],
}
