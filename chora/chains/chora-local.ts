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

export const choraLocalX = {
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
            gitVersionLink: "https://github.com/choraio/mods/tree/main",
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
            gitVersionLink: "https://github.com/choraio/mods/tree/main",
            specification: "https://docs.chora.io/specs/voucher",
        },
    ],
}
