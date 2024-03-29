export const choraTestnet = {
  chainId: 'chora-testnet-1',
  chainName: 'Chora Testnet',
  rpc: 'https://testnet.chora.io/rpc',
  rest: 'https://testnet.chora.io/rest',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'chora',
    bech32PrefixAccPub: 'chorapub',
    bech32PrefixValAddr: 'choravaloper',
    bech32PrefixValPub: 'choravaloperpub',
    bech32PrefixConsAddr: 'choravalcons',
    bech32PrefixConsPub: 'choravalconspub',
  },
  currencies: [
    {
      coinDenom: 'CHORA',
      coinMinimalDenom: 'uchora',
      coinDecimals: 6,
      coinGeckoId: 'chora',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'CHORA',
      coinMinimalDenom: 'uchora',
      coinDecimals: 6,
      coinGeckoId: 'chora',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'CHORA',
    coinMinimalDenom: 'uchora',
    coinDecimals: 6,
    coinGeckoId: 'chora',
  },
}

export const choraTestnetX = {
  faucet: 'https://testnet.chora.io/faucet/',
  server: 'https://server.chora.io',
  modules: [
    {
      apiPackage: 'chora.content.v1',
      documentation: 'https://docs.chora.io/specs/content',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'v0.0.0',
      gitVersionLink: 'https://github.com/chora-io/mods/tree/main',
    },
    {
      apiPackage: 'chora.geonode.v1',
      documentation: 'https://docs.chora.io/specs/geonode',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'v0.0.0',
      gitVersionLink: 'https://github.com/chora-io/mods/tree/main',
    },
    {
      apiPackage: 'chora.voucher.v1',
      documentation: 'https://docs.chora.io/specs/voucher',
      gitRepository: 'https://github.com/chora-io/mods',
      gitVersion: 'v0.0.0',
      gitVersionLink: 'https://github.com/chora-io/mods/tree/main',
    },
    {
      apiPackage: 'cosmos.authz.v1beta1',
      documentation: 'https://docs.cosmos.network/main/modules/authz',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'cosmos.bank.v1beta1',
      documentation: 'https://docs.cosmos.network/main/modules/bank',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'cosmos.feegrant.v1beta1',
      documentation: 'https://docs.cosmos.network/main/modules/feegrant',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },

    {
      apiPackage: 'cosmos.group.v1',
      documentation: 'https://docs.cosmos.network/main/modules/group',
      gitRepository: 'https://github.com/cosmos/cosmos-sdk',
      gitVersion: 'v0.46.13',
      gitVersionLink: 'https://github.com/cosmos/cosmos-sdk/tree/v0.46.13',
    },
    {
      apiPackage: 'regen.data.v1',
      documentation: 'https://docs.regen.network/modules/data',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'v5.1.2',
      gitVersionLink:
        'https://github.com/regen-network/regen-ledger/tree/v5.1.2',
    },
    {
      apiPackage: 'regen.intertx.v1',
      documentation: 'https://docs.regen.network/modules/intertx',
      gitRepository: 'https://github.com/regen-network/regen-ledger',
      gitVersion: 'v5.1.2',
      gitVersionLink:
        'https://github.com/regen-network/regen-ledger/tree/v5.1.2',
    },
  ],
}
