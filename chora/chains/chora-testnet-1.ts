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
            moduleName: "feegrant",
            gitRepository: "https://github.com/cosmos/cosmos-sdk",
            gitVersion: "v0.46.13",
            gitVersionLink: "https://github.com/cosmos/cosmos-sdk/tree/v0.46.13",
            specification: "https://docs.cosmos.network/main/modules/feegrant",
        },
        {
            moduleName: "geonode",
            gitRepository: "https://github.com/choraio/mods",
            gitVersion: "v0.0.0",
            specification: "https://docs.chora.io/specs/geonode",
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
        {
            moduleName: "voucher",
            gitRepository: "https://github.com/choraio/mods",
            gitVersion: "v0.0.0",
            specification: "https://docs.chora.io/specs/voucher",
        },
    ],
}
